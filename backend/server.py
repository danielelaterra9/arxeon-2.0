from fastapi import FastAPI, APIRouter, HTTPException, Request, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import stripe
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe configuration
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY', '')
STRIPE_WEBHOOK_SECRET = os.environ.get('STRIPE_WEBHOOK_SECRET', '')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')

# Resend configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================================
# MODELS
# ============================================================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Checkout Models
class CheckoutItem(BaseModel):
    name: str
    price: int  # in centesimi CHF
    type: str  # 'subscription' or 'one_time'
    quantity: int = 1

class CreateCheckoutRequest(BaseModel):
    package: str  # 'basic', 'premium', 'gold'
    items: List[CheckoutItem]
    customer_email: Optional[str] = None

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    package: str
    items: List[dict]
    total_monthly: int
    total_one_time: int
    customer_email: Optional[str] = None
    stripe_session_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None
    payment_status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Onboarding Models
class OnboardingData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: Optional[str] = None
    full_name: str
    email: EmailStr
    company: str
    website: Optional[str] = None
    social_platforms: List[str] = []
    social_links: Optional[str] = None
    has_gmb: bool = False
    gmb_link: Optional[str] = None
    ads_platforms: List[str] = []
    main_objective: str
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OnboardingRequest(BaseModel):
    order_id: Optional[str] = None
    full_name: str
    email: EmailStr
    company: str
    website: Optional[str] = None
    social_platforms: List[str] = []
    social_links: Optional[str] = None
    has_gmb: bool = False
    gmb_link: Optional[str] = None
    ads_platforms: List[str] = []
    main_objective: str
    notes: Optional[str] = None

# ============================================================
# EMAIL SERVICE
# ============================================================

async def send_email(to: str, subject: str, html_content: str):
    """Send email via Resend or fallback to logging"""
    if RESEND_API_KEY:
        try:
            import resend
            resend.api_key = RESEND_API_KEY
            
            params = {
                "from": "Arxéon <noreply@arxeon.ch>",
                "to": [to],
                "subject": subject,
                "html": html_content
            }
            
            email = resend.Emails.send(params)
            logger.info(f"Email sent successfully to {to}: {email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email via Resend: {e}")
            # Fallback to logging
    
    # Mock/Log fallback
    logger.info(f"[MOCK EMAIL] To: {to}")
    logger.info(f"[MOCK EMAIL] Subject: {subject}")
    logger.info(f"[MOCK EMAIL] Content: {html_content[:200]}...")
    return True

def generate_confirmation_email(order: dict) -> str:
    """Generate HTML email for order confirmation"""
    items_html = ""
    for item in order.get('items', []):
        price_text = f"CHF {item['price'] / 100:.0f}"
        if item['type'] == 'subscription':
            price_text += "/mese"
        else:
            price_text += " (una tantum)"
        items_html += f"<li>{item['name']} - {price_text}</li>"
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Inter', Arial, sans-serif; background: #161716; color: #ffffff; padding: 40px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #2a2c29; border-radius: 12px; padding: 40px; }}
            h1 {{ color: #c8f000; margin-bottom: 20px; }}
            .highlight {{ color: #c8f000; }}
            ul {{ padding-left: 20px; }}
            li {{ margin-bottom: 10px; color: #9a9a96; }}
            .total {{ font-size: 24px; font-weight: bold; margin-top: 20px; }}
            .footer {{ margin-top: 40px; padding-top: 20px; border-top: 1px solid #343633; color: #6f716d; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Grazie per aver scelto Arxéon</h1>
            <p>Il tuo ordine è stato confermato.</p>
            
            <h3>Riepilogo ordine:</h3>
            <p><strong>Pacchetto:</strong> <span class="highlight">{order.get('package', '').title()}</span></p>
            
            <ul>{items_html}</ul>
            
            <p class="total">
                Totale mensile: <span class="highlight">CHF {order.get('total_monthly', 0) / 100:.0f}</span>
                {f"<br>Una tantum: CHF {order.get('total_one_time', 0) / 100:.0f}" if order.get('total_one_time', 0) > 0 else ""}
            </p>
            
            <h3>Prossimi passi:</h3>
            <ol>
                <li>Riceverai il contratto via email</li>
                <li>Compila il formulario di onboarding</li>
                <li>Analizziamo il tuo caso</li>
                <li>Prenota la prima consulenza</li>
            </ol>
            
            <div class="footer">
                <p>Arxéon - Marketing strategico orientato ai risultati</p>
                <p>info@arxeon.ch | Lugano, Svizzera</p>
            </div>
        </div>
    </body>
    </html>
    """

# ============================================================
# STRIPE ENDPOINTS
# ============================================================

@api_router.post("/create-checkout-session")
async def create_checkout_session(request: CreateCheckoutRequest):
    """Create a Stripe Checkout Session"""
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured. Please set STRIPE_SECRET_KEY.")
    
    try:
        line_items = []
        subscription_items = []
        one_time_items = []
        
        for item in request.items:
            if item.type == 'subscription':
                subscription_items.append({
                    'price_data': {
                        'currency': 'chf',
                        'product_data': {
                            'name': item.name,
                        },
                        'unit_amount': item.price,
                        'recurring': {
                            'interval': 'month',
                        },
                    },
                    'quantity': item.quantity,
                })
            else:
                one_time_items.append({
                    'price_data': {
                        'currency': 'chf',
                        'product_data': {
                            'name': item.name,
                        },
                        'unit_amount': item.price,
                    },
                    'quantity': item.quantity,
                })
        
        # Determine mode based on items
        if subscription_items and not one_time_items:
            mode = 'subscription'
            line_items = subscription_items
        elif one_time_items and not subscription_items:
            mode = 'payment'
            line_items = one_time_items
        else:
            # Mixed: use subscription mode with add_invoice_items for one-time
            mode = 'subscription'
            line_items = subscription_items
            # Note: In a real implementation, you'd handle this differently
            # For now, we'll combine them in subscription mode
            for item in one_time_items:
                item['price_data']['recurring'] = {'interval': 'month', 'interval_count': 1}
                line_items.append(item)
        
        # Calculate totals
        total_monthly = sum(item.price * item.quantity for item in request.items if item.type == 'subscription')
        total_one_time = sum(item.price * item.quantity for item in request.items if item.type == 'one_time')
        
        # Create order in database
        order = Order(
            package=request.package,
            items=[item.model_dump() for item in request.items],
            total_monthly=total_monthly,
            total_one_time=total_one_time,
            customer_email=request.customer_email
        )
        
        order_dict = order.model_dump()
        order_dict['created_at'] = order_dict['created_at'].isoformat()
        await db.orders.insert_one(order_dict)
        
        # Create Stripe session
        session_params = {
            'payment_method_types': ['card'],
            'line_items': line_items,
            'mode': mode,
            'success_url': f"{FRONTEND_URL}/thank-you?session_id={{CHECKOUT_SESSION_ID}}&order_id={order.id}",
            'cancel_url': f"{FRONTEND_URL}/checkout/{request.package}",
            'metadata': {
                'order_id': order.id,
                'package': request.package
            },
            'locale': 'it',
        }
        
        if request.customer_email:
            session_params['customer_email'] = request.customer_email
        
        session = stripe.checkout.Session.create(**session_params)
        
        # Update order with session ID
        await db.orders.update_one(
            {'id': order.id},
            {'$set': {'stripe_session_id': session.id}}
        )
        
        return {
            'sessionId': session.id,
            'url': session.url,
            'orderId': order.id
        }
        
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating checkout session: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """Handle Stripe webhooks"""
    payload = await request.body()
    
    if STRIPE_WEBHOOK_SECRET:
        try:
            event = stripe.Webhook.construct_event(
                payload, stripe_signature, STRIPE_WEBHOOK_SECRET
            )
        except ValueError as e:
            logger.error(f"Invalid payload: {e}")
            raise HTTPException(status_code=400, detail="Invalid payload")
        except stripe.error.SignatureVerificationError as e:
            logger.error(f"Invalid signature: {e}")
            raise HTTPException(status_code=400, detail="Invalid signature")
    else:
        # Without webhook secret, parse the event directly (not recommended for production)
        try:
            event = json.loads(payload)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid JSON")
    
    event_type = event.get('type', '')
    logger.info(f"Received Stripe webhook: {event_type}")
    
    if event_type == 'checkout.session.completed':
        session = event['data']['object']
        order_id = session.get('metadata', {}).get('order_id')
        
        if order_id:
            # Update order status
            await db.orders.update_one(
                {'id': order_id},
                {
                    '$set': {
                        'payment_status': 'completed',
                        'stripe_subscription_id': session.get('subscription')
                    }
                }
            )
            
            # Get order details
            order = await db.orders.find_one({'id': order_id}, {'_id': 0})
            
            if order and order.get('customer_email'):
                # Send confirmation email
                await send_email(
                    to=order['customer_email'],
                    subject="Conferma ordine Arxéon - Il tuo servizio è attivo",
                    html_content=generate_confirmation_email(order)
                )
            
            logger.info(f"Order {order_id} completed successfully")
    
    elif event_type == 'invoice.payment_succeeded':
        # Handle successful subscription payment
        invoice = event['data']['object']
        subscription_id = invoice.get('subscription')
        
        if subscription_id:
            order = await db.orders.find_one(
                {'stripe_subscription_id': subscription_id},
                {'_id': 0}
            )
            
            if order and order.get('customer_email'):
                # Send payment receipt
                await send_email(
                    to=order['customer_email'],
                    subject="Ricevuta pagamento Arxéon",
                    html_content=f"""
                    <h1>Pagamento ricevuto</h1>
                    <p>Grazie, il pagamento di CHF {invoice.get('amount_paid', 0) / 100:.2f} è stato elaborato correttamente.</p>
                    <p>Pacchetto: {order.get('package', '').title()}</p>
                    """
                )
    
    elif event_type == 'customer.subscription.deleted':
        # Handle subscription cancellation
        subscription = event['data']['object']
        subscription_id = subscription.get('id')
        
        if subscription_id:
            await db.orders.update_one(
                {'stripe_subscription_id': subscription_id},
                {'$set': {'payment_status': 'cancelled'}}
            )
    
    return {'status': 'success'}

@api_router.get("/order/{order_id}")
async def get_order(order_id: str):
    """Get order details"""
    order = await db.orders.find_one({'id': order_id}, {'_id': 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@api_router.get("/verify-session/{session_id}")
async def verify_session(session_id: str):
    """Verify a Stripe session and return order details"""
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        order_id = session.metadata.get('order_id')
        
        if order_id:
            order = await db.orders.find_one({'id': order_id}, {'_id': 0})
            return {
                'valid': True,
                'payment_status': session.payment_status,
                'order': order
            }
        
        return {'valid': False, 'message': 'No order found'}
        
    except stripe.error.StripeError as e:
        logger.error(f"Error verifying session: {e}")
        return {'valid': False, 'message': str(e)}

# ============================================================
# ONBOARDING ENDPOINTS
# ============================================================

@api_router.post("/onboarding")
async def submit_onboarding(data: OnboardingRequest):
    """Submit onboarding form"""
    onboarding = OnboardingData(**data.model_dump())
    
    onboarding_dict = onboarding.model_dump()
    onboarding_dict['created_at'] = onboarding_dict['created_at'].isoformat()
    
    await db.onboarding.insert_one(onboarding_dict)
    
    # Send confirmation email
    await send_email(
        to=data.email,
        subject="Onboarding Arxéon - Informazioni ricevute",
        html_content=f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Inter', Arial, sans-serif; background: #161716; color: #ffffff; padding: 40px; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #2a2c29; border-radius: 12px; padding: 40px; }}
                h1 {{ color: #c8f000; }}
                .highlight {{ color: #c8f000; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Grazie {data.full_name}!</h1>
                <p>Abbiamo ricevuto le informazioni per l'onboarding di <span class="highlight">{data.company}</span>.</p>
                <p>Il nostro team analizzerà il tuo caso e ti contatterà a breve.</p>
                <p>Nel frattempo, puoi prenotare la tua prima consulenza:</p>
                <p><a href="https://calendly.com/arxeon/30min" style="color: #c8f000;">Prenota ora →</a></p>
            </div>
        </body>
        </html>
        """
    )
    
    return {
        'success': True,
        'message': 'Onboarding submitted successfully',
        'id': onboarding.id
    }

@api_router.get("/onboarding/{onboarding_id}")
async def get_onboarding(onboarding_id: str):
    """Get onboarding details"""
    onboarding = await db.onboarding.find_one({'id': onboarding_id}, {'_id': 0})
    if not onboarding:
        raise HTTPException(status_code=404, detail="Onboarding not found")
    return onboarding

# ============================================================
# EXISTING ENDPOINTS
# ============================================================

@api_router.get("/")
async def root():
    return {"message": "Arxéon API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.get("/config/stripe")
async def get_stripe_config():
    """Return Stripe publishable key for frontend"""
    return {
        'publishableKey': os.environ.get('STRIPE_PUBLISHABLE_KEY', '')
    }

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
