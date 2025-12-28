from fastapi import FastAPI, APIRouter, HTTPException, Request, Header, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone
import stripe
import json
import asyncio
import base64
from io import BytesIO

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe configuration
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY', '')
STRIPE_WEBHOOK_SECRET = os.environ.get('STRIPE_WEBHOOK_SECRET', '')

# App Base URL configuration (for Stripe redirects)
APP_BASE_URL = os.environ.get('APP_BASE_URL', '')

# Frontend URL for Stripe redirects (uses APP_URL from supervisor or APP_BASE_URL)
FRONTEND_URL = APP_BASE_URL or os.environ.get('APP_URL', 'http://localhost:3000')
FRONTEND_URL = FRONTEND_URL.rstrip('/')  # Remove trailing slash

# Resend configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')

# Emergent LLM Key for AI generation
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

def get_base_url(request: Request) -> str:
    """Get base URL from env or derive from request headers"""
    if APP_BASE_URL:
        return APP_BASE_URL.rstrip('/')
    
    # Fallback: derive from request headers
    proto = request.headers.get('x-forwarded-proto', 'https')
    host = request.headers.get('x-forwarded-host') or request.headers.get('host', '')
    
    if host:
        return f"{proto}://{host}"
    
    # Last resort fallback
    return 'https://marketing-packs.preview.emergentagent.com'

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
# STRIPE PRICE MAPPING (Server-side only)
# ============================================================

# Package base prices (monthly subscriptions)
PACKAGE_PRICES = {
    "basic": {
        "price_id": "price_1SghaZCdt6E6uRkpGCC3Dkui",
        "name": "Pacchetto Basic",
        "amount": 20000  # CHF 200 in cents
    },
    "premium": {
        "price_id": "price_1Sghb8Cdt6E6uRkpcC7fOGyH",
        "name": "Pacchetto Premium", 
        "amount": 40000  # CHF 400 in cents
    },
    "gold": {
        "price_id": "price_1SghbTCdt6E6uRkpCTy7mQht",
        "name": "Pacchetto Gold",
        "amount": 170000  # CHF 1700 in cents
    }
}

# Add-on prices mapping: code -> Stripe price details
ADDON_PRICES = {
    # Monthly recurring add-ons
    "addon_social_extra_monthly": {
        "price_id": "price_1SghdkCdt6E6uRkpi4C8pFpD",
        "name": "Piattaforma social aggiuntiva",
        "amount": 40000,
        "type": "recurring",
        "allowed_packages": ["premium", "gold"]
    },
    "addon_ads_extra_monthly": {
        "price_id": "price_1SgheOCdt6E6uRkpdJbRMAiZ",
        "name": "Piattaforma ads aggiuntiva",
        "amount": 40000,
        "type": "recurring",
        "allowed_packages": ["premium", "gold"]
    },
    "addon_seo_monthly": {
        "price_id": "price_1SghgDCdt6E6uRkpn4mBHCcP",
        "name": "Ottimizzazione SEO",
        "amount": 50000,
        "type": "recurring",
        "allowed_packages": ["premium", "gold"]
    },
    "addon_gmb_monthly": {
        "price_id": "price_1SghfbCdt6E6uRkp02IkV6KW",
        "name": "Google My Business (mensile)",
        "amount": 10000,
        "type": "recurring",
        "allowed_packages": ["basic", "premium", "gold"]
    },
    "addon_second_business_monthly": {
        "price_id": "price_1SghgfCdt6E6uRkphliUzSXt",
        "name": "Gestione secondo business",
        "amount": 120000,
        "type": "recurring",
        "allowed_packages": ["gold"]
    },
    # One-time add-ons
    "oneshot_website": {
        "price_id": "price_1SghNjCdt6E6uRkpvjlht162",
        "name": "Creazione/rifacimento sito",
        "amount": 80000,
        "type": "one_time",
        "allowed_packages": ["basic", "premium", "gold"]
    },
    "oneshot_logo": {
        "price_id": "price_1SghcOCdt6E6uRkp9DGPFgXe",
        "name": "Creazione/restyling logo + visual identity",
        "amount": 65000,
        "type": "one_time",
        "allowed_packages": ["basic", "premium", "gold"]
    },
    "oneshot_gmb_setup": {
        "price_id": "price_1Sghd0Cdt6E6uRkpnSHWD1wT",
        "name": "Setup Google My Business",
        "amount": 20000,
        "type": "one_time",
        "allowed_packages": ["basic", "premium", "gold"]
    }
}

# Valid included categories for Premium
VALID_CATEGORIES = ["sito", "social", "ads", "email", "seo"]

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

# New Bundle Checkout Request Model
class BundleCheckoutRequest(BaseModel):
    package: Literal["basic", "premium", "gold"]
    selectedAddons: List[str] = []  # List of addon codes
    includedCategory: Optional[str] = None  # Required for premium
    selectedPlatform: Optional[str] = None  # For social/ads category
    customerEmail: Optional[EmailStr] = None

# Subscription/Order Model for DB
class Subscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: Optional[str] = None
    package: str
    included_category: Optional[str] = None
    selected_platform: Optional[str] = None
    addons: List[str] = []
    stripe_customer_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None
    stripe_session_id: Optional[str] = None
    status: str = "pending"
    total_monthly: int = 0
    total_one_time: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Onboarding Models
class OnboardingData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    subscription_id: Optional[str] = None
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
    subscription_id: Optional[str] = None
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
    
    # Mock/Log fallback
    logger.info(f"[MOCK EMAIL] To: {to}")
    logger.info(f"[MOCK EMAIL] Subject: {subject}")
    logger.info(f"[MOCK EMAIL] Content: {html_content[:200]}...")
    return True

def generate_confirmation_email(subscription: dict) -> str:
    """Generate HTML email for subscription confirmation"""
    package_name = PACKAGE_PRICES.get(subscription.get('package', ''), {}).get('name', 'Pacchetto')
    
    addons_html = ""
    for addon_code in subscription.get('addons', []):
        addon = ADDON_PRICES.get(addon_code, {})
        if addon:
            price = addon['amount'] / 100
            suffix = "/mese" if addon['type'] == 'recurring' else " (una tantum)"
            addons_html += f"<li>{addon['name']} - CHF {price:.0f}{suffix}</li>"
    
    category_text = ""
    if subscription.get('included_category'):
        category_text = f"<p><strong>Categoria inclusa:</strong> {subscription['included_category'].title()}</p>"
    
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
            .cta {{ display: inline-block; background: #c8f000; color: #161716; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Grazie per aver scelto Arxéon</h1>
            <p>Il tuo abbonamento è stato attivato.</p>
            
            <h3>Riepilogo:</h3>
            <p><strong>Pacchetto:</strong> <span class="highlight">{package_name}</span></p>
            {category_text}
            
            {f"<h4>Add-on selezionati:</h4><ul>{addons_html}</ul>" if addons_html else ""}
            
            <p class="total">
                Totale mensile: <span class="highlight">CHF {subscription.get('total_monthly', 0) / 100:.0f}</span>
                {f"<br>Una tantum: CHF {subscription.get('total_one_time', 0) / 100:.0f}" if subscription.get('total_one_time', 0) > 0 else ""}
            </p>
            
            <h3>Prossimi passi:</h3>
            <ol>
                <li>Compila il formulario di onboarding</li>
                <li>Analizziamo il tuo caso</li>
                <li>Prenota la prima consulenza</li>
            </ol>
            
            <a href="{FRONTEND_URL}/onboarding?subscription_id={subscription.get('id', '')}" class="cta">
                Inizia l'onboarding →
            </a>
            
            <div class="footer">
                <p>Arxéon - Marketing strategico orientato ai risultati</p>
                <p>info@arxeon.ch | Lugano, Svizzera</p>
            </div>
        </div>
    </body>
    </html>
    """

# ============================================================
# STRIPE BUNDLE CHECKOUT ENDPOINT
# ============================================================

@api_router.post("/stripe/create-checkout-session")
async def create_bundle_checkout(request: BundleCheckoutRequest):
    """
    Create a Stripe Checkout Session for package + add-ons bundle.
    Frontend sends only codes, backend maps to Stripe price_ids.
    """
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured. Please set STRIPE_SECRET_KEY.")
    
    package = request.package
    selected_addons = request.selectedAddons
    included_category = request.includedCategory
    selected_platform = request.selectedPlatform
    customer_email = request.customerEmail
    
    # Validate package
    if package not in PACKAGE_PRICES:
        raise HTTPException(status_code=400, detail=f"Invalid package: {package}")
    
    # Validate Premium requires included category
    if package == "premium":
        if not included_category or included_category not in VALID_CATEGORIES:
            raise HTTPException(
                status_code=400, 
                detail=f"Premium package requires includedCategory. Valid: {VALID_CATEGORIES}"
            )
    
    # Validate add-ons
    validated_addons = []
    for addon_code in selected_addons:
        if addon_code not in ADDON_PRICES:
            raise HTTPException(status_code=400, detail=f"Invalid addon code: {addon_code}")
        
        addon = ADDON_PRICES[addon_code]
        if package not in addon['allowed_packages']:
            raise HTTPException(
                status_code=400, 
                detail=f"Addon '{addon_code}' not allowed for package '{package}'"
            )
        validated_addons.append(addon_code)
    
    # Build line_items
    line_items = []
    total_monthly = 0
    total_one_time = 0
    
    # Add package base price
    pkg = PACKAGE_PRICES[package]
    line_items.append({
        'price_data': {
            'currency': 'chf',
            'product_data': {'name': pkg['name']},
            'unit_amount': pkg['amount'],
            'recurring': {'interval': 'month'}
        },
        'quantity': 1
    })
    total_monthly += pkg['amount']
    
    # Add validated add-ons
    for addon_code in validated_addons:
        addon = ADDON_PRICES[addon_code]
        
        if addon['type'] == 'recurring':
            line_items.append({
                'price_data': {
                    'currency': 'chf',
                    'product_data': {'name': addon['name']},
                    'unit_amount': addon['amount'],
                    'recurring': {'interval': 'month'}
                },
                'quantity': 1
            })
            total_monthly += addon['amount']
        else:
            # One-time items - add to subscription as invoice items
            line_items.append({
                'price_data': {
                    'currency': 'chf',
                    'product_data': {'name': addon['name']},
                    'unit_amount': addon['amount'],
                },
                'quantity': 1
            })
            total_one_time += addon['amount']
    
    # Create subscription record in DB
    subscription = Subscription(
        email=customer_email,
        package=package,
        included_category=included_category,
        selected_platform=selected_platform,
        addons=validated_addons,
        total_monthly=total_monthly,
        total_one_time=total_one_time,
        status="pending"
    )
    
    sub_dict = subscription.model_dump()
    sub_dict['created_at'] = sub_dict['created_at'].isoformat()
    sub_dict['updated_at'] = sub_dict['updated_at'].isoformat()
    await db.subscriptions.insert_one(sub_dict)
    
    try:
        # Determine checkout mode
        has_recurring = any(ADDON_PRICES.get(a, {}).get('type') == 'recurring' for a in validated_addons) or True  # Package is always recurring
        has_one_time = any(ADDON_PRICES.get(a, {}).get('type') == 'one_time' for a in validated_addons)
        
        # If we have both recurring and one-time, use subscription mode
        # One-time items will be charged as part of the first invoice
        mode = 'subscription'
        
        # Separate line items for subscription mode with one-time charges
        subscription_items = []
        one_time_items = []
        
        for addon_code in validated_addons:
            addon = ADDON_PRICES[addon_code]
            if addon['type'] == 'one_time':
                one_time_items.append({
                    'price_data': {
                        'currency': 'chf',
                        'product_data': {'name': addon['name']},
                        'unit_amount': addon['amount'],
                    },
                    'quantity': 1
                })
            else:
                subscription_items.append({
                    'price_data': {
                        'currency': 'chf',
                        'product_data': {'name': addon['name']},
                        'unit_amount': addon['amount'],
                        'recurring': {'interval': 'month'}
                    },
                    'quantity': 1
                })
        
        # Always add package as recurring
        subscription_items.insert(0, {
            'price_data': {
                'currency': 'chf',
                'product_data': {'name': pkg['name']},
                'unit_amount': pkg['amount'],
                'recurring': {'interval': 'month'}
            },
            'quantity': 1
        })
        
        # Combine all items (Stripe handles mixed items in subscription mode)
        all_line_items = subscription_items + one_time_items
        
        # Create Stripe Checkout Session
        session_params = {
            'payment_method_types': ['card'],
            'line_items': all_line_items,
            'mode': mode,
            'success_url': f"{FRONTEND_URL}/thank-you?session_id={{CHECKOUT_SESSION_ID}}&subscription_id={subscription.id}",
            'cancel_url': f"{FRONTEND_URL}/checkout/{package}",
            'metadata': {
                'subscription_id': subscription.id,
                'package': package,
                'included_category': included_category or '',
                'selected_platform': selected_platform or '',
                'addon_codes': ','.join(validated_addons)
            },
            'subscription_data': {
                'metadata': {
                    'subscription_id': subscription.id,
                    'package': package,
                    'included_category': included_category or '',
                    'addon_codes': ','.join(validated_addons)
                }
            },
            'locale': 'it',
        }
        
        if customer_email:
            session_params['customer_email'] = customer_email
        
        session = stripe.checkout.Session.create(**session_params)
        
        # Update subscription with session ID
        await db.subscriptions.update_one(
            {'id': subscription.id},
            {'$set': {'stripe_session_id': session.id}}
        )
        
        logger.info(f"Created checkout session {session.id} for subscription {subscription.id}")
        
        return {
            'checkoutUrl': session.url,
            'sessionId': session.id,
            'subscriptionId': subscription.id
        }
        
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {e}")
        # Mark subscription as failed
        await db.subscriptions.update_one(
            {'id': subscription.id},
            {'$set': {'status': 'failed'}}
        )
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating checkout session: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================
# STRIPE WEBHOOK
# ============================================================

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None, alias="stripe-signature")):
    """Handle Stripe webhooks with signature verification"""
    payload = await request.body()
    
    # Verify webhook signature
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
        # Without webhook secret, parse event directly (not recommended for production)
        logger.warning("STRIPE_WEBHOOK_SECRET not set - skipping signature verification")
        try:
            event = json.loads(payload)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid JSON")
    
    event_type = event.get('type', '')
    logger.info(f"Received Stripe webhook: {event_type}")
    
    if event_type == 'checkout.session.completed':
        session = event['data']['object']
        metadata = session.get('metadata', {})
        subscription_id = metadata.get('subscription_id')
        
        if subscription_id:
            # Update subscription status
            update_data = {
                'status': 'active',
                'stripe_customer_id': session.get('customer'),
                'stripe_subscription_id': session.get('subscription'),
                'updated_at': datetime.now(timezone.utc).isoformat()
            }
            
            # Get customer email from session
            customer_email = session.get('customer_details', {}).get('email') or session.get('customer_email')
            if customer_email:
                update_data['email'] = customer_email
            
            await db.subscriptions.update_one(
                {'id': subscription_id},
                {'$set': update_data}
            )
            
            # Get updated subscription
            subscription = await db.subscriptions.find_one({'id': subscription_id}, {'_id': 0})
            
            if subscription and subscription.get('email'):
                # Send confirmation email
                await send_email(
                    to=subscription['email'],
                    subject="Conferma abbonamento Arxéon - Il tuo servizio è attivo",
                    html_content=generate_confirmation_email(subscription)
                )
            
            logger.info(f"Subscription {subscription_id} activated successfully")
    
    elif event_type == 'invoice.payment_succeeded':
        invoice = event['data']['object']
        stripe_subscription_id = invoice.get('subscription')
        
        if stripe_subscription_id:
            subscription = await db.subscriptions.find_one(
                {'stripe_subscription_id': stripe_subscription_id},
                {'_id': 0}
            )
            
            if subscription and subscription.get('email'):
                amount = invoice.get('amount_paid', 0) / 100
                await send_email(
                    to=subscription['email'],
                    subject="Ricevuta pagamento Arxéon",
                    html_content=f"""
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #2a2c29; padding: 40px; border-radius: 12px;">
                        <h1 style="color: #c8f000;">Pagamento ricevuto</h1>
                        <p style="color: #ffffff;">Grazie, il pagamento di CHF {amount:.2f} è stato elaborato correttamente.</p>
                        <p style="color: #9a9a96;">Pacchetto: {subscription.get('package', '').title()}</p>
                    </div>
                    """
                )
    
    elif event_type == 'customer.subscription.deleted':
        subscription_data = event['data']['object']
        stripe_subscription_id = subscription_data.get('id')
        
        if stripe_subscription_id:
            await db.subscriptions.update_one(
                {'stripe_subscription_id': stripe_subscription_id},
                {'$set': {'status': 'cancelled', 'updated_at': datetime.now(timezone.utc).isoformat()}}
            )
            logger.info(f"Subscription {stripe_subscription_id} cancelled")
    
    return {'status': 'success'}

# ============================================================
# SUBSCRIPTION & ORDER ENDPOINTS
# ============================================================

@api_router.get("/subscription/{subscription_id}")
async def get_subscription(subscription_id: str):
    """Get subscription details"""
    subscription = await db.subscriptions.find_one({'id': subscription_id}, {'_id': 0})
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return subscription

@api_router.get("/verify-session/{session_id}")
async def verify_session(session_id: str):
    """Verify a Stripe session and return subscription details"""
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        subscription_id = session.metadata.get('subscription_id')
        
        if subscription_id:
            subscription = await db.subscriptions.find_one({'id': subscription_id}, {'_id': 0})
            return {
                'valid': True,
                'payment_status': session.payment_status,
                'subscription': subscription
            }
        
        return {'valid': False, 'message': 'No subscription found'}
        
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
                .cta {{ display: inline-block; background: #c8f000; color: #161716; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Grazie {data.full_name}!</h1>
                <p>Abbiamo ricevuto le informazioni per l'onboarding di <span class="highlight">{data.company}</span>.</p>
                <p>Il nostro team analizzerà il tuo caso e ti contatterà a breve.</p>
                <p>Nel frattempo, puoi prenotare la tua prima consulenza:</p>
                <a href="https://calendly.com/arxeon/30min" class="cta">Prenota ora →</a>
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
# CONFIG & UTILITY ENDPOINTS
# ============================================================

@api_router.get("/")
async def root():
    return {"message": "Arxéon API"}

@api_router.get("/debug/config")
async def debug_config():
    """Debug endpoint to verify URL configuration"""
    return {
        'FRONTEND_URL': FRONTEND_URL,
        'APP_BASE_URL': APP_BASE_URL,
        'APP_URL': os.environ.get('APP_URL', 'not set'),
        'success_url_example': f"{FRONTEND_URL}/thank-you?session_id=test"
    }

@api_router.get("/config/stripe")
async def get_stripe_config():
    """Return Stripe publishable key for frontend"""
    return {
        'publishableKey': os.environ.get('STRIPE_PUBLISHABLE_KEY', '')
    }

@api_router.get("/config/addons")
async def get_addons_config():
    """Return available add-ons for each package (without price_ids)"""
    addons_by_package = {
        "basic": [],
        "premium": [],
        "gold": []
    }
    
    for code, addon in ADDON_PRICES.items():
        addon_info = {
            "code": code,
            "name": addon["name"],
            "amount": addon["amount"],
            "type": addon["type"]
        }
        for pkg in addon["allowed_packages"]:
            addons_by_package[pkg].append(addon_info)
    
    return {
        "packages": {
            pkg: {"name": info["name"], "amount": info["amount"]}
            for pkg, info in PACKAGE_PRICES.items()
        },
        "addons": addons_by_package,
        "validCategories": VALID_CATEGORIES
    }

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

# Router will be included after all endpoints are defined

# ============================================================
# FREE AUDIT / VALUTAZIONE STRATEGICA AI SYSTEM
# ============================================================

# Pydantic model for free audit request
class FreeAuditRequest(BaseModel):
    fullName: str
    email: EmailStr
    phone: Optional[str] = ""
    companyName: str
    website: Optional[str] = ""
    sector: str
    geoArea: str
    channels: List[str]
    objective: str
    budget: str
    mainProblem: str
    previousAttempts: Optional[str] = ""  # New field: tentativi precedenti
    improvementImportance: int = Field(ge=1, le=5, default=3)  # New field: importanza 1-5

class FreeAuditResponse(BaseModel):
    id: str
    status: str
    message: str

# Master prompt for AI evaluation
EVALUATION_MASTER_PROMPT = """Agisci come un consulente di marketing strategico senior.

Il tuo compito è redigere una VALUTAZIONE STRATEGICA PERSONALIZZATA
per un potenziale cliente, basandoti esclusivamente sulle informazioni fornite.

⚠️ Regole fondamentali:
- NON usare linguaggio promozionale.
- NON promettere risultati.
- NON spiegare strategie complete o operative.
- NON sembrare un report automatico.
- Usa un tono professionale, chiaro, diretto, umano.
- Scrivi come se il report fosse stato rivisto da un consulente reale.

🎯 Obiettivo del documento:
- Far emergere con chiarezza problemi, rischi e opportunità.
- Creare consapevolezza e tensione decisionale.
- Portare naturalmente al bisogno di supporto esterno.

📄 Lunghezza:
- 1–2 pagine massimo.
- Lettura 5–7 minuti.

📌 STRUTTURA OBBLIGATORIA:

TITOLO:
"Valutazione Strategica del Marketing"

1. Introduzione personalizzata
- Riassumi il contesto del business.
- Dimostra comprensione della situazione attuale.

2. Stato attuale – Diagnosi
- Elenca 3–5 criticità principali.
- Ogni punto deve avere:
  • titolo breve
  • spiegazione concreta
  • implicazione pratica

3. Rischi principali
- Spiega cosa succede se la situazione resta invariata.
- Usa un tono razionale, non allarmistico.

4. Opportunità di miglioramento
- Evidenzia dove esiste margine di crescita.
- NON spiegare come farlo nel dettaglio.

5. Priorità strategiche consigliate
- Massimo 3 priorità.
- Chiare, concrete, non tecniche.

6. Conclusione
- Ribadisci il valore di un approccio strutturato.
- Chiudi invitando a un confronto per capire quale supporto è più adatto.

📊 VALUTAZIONE FINALE (OBBLIGATORIA):
Inserisci una sezione finale con:
- Livello di maturità marketing (Basso / Medio / Avanzato)
- Punteggio complessivo marketing (0–10)
- Breve spiegazione del punteggio (3–4 righe)

📥 DATI DEL BUSINESS:
Nome: {nome}
Azienda: {azienda}
Settore: {settore}
Area geografica: {area}
Canali attuali: {canali}
Obiettivo principale: {obiettivo}
Budget mensile: {budget}
Difficoltà principale: {problema}
Tentativi precedenti: {tentativi}
Importanza del miglioramento (1–5): {importanza}

Genera la valutazione strategica completa."""

async def generate_evaluation_with_ai(audit_data: dict) -> dict:
    """Generate strategic evaluation using OpenAI GPT-4o via Emergent LLM Key"""
    if not EMERGENT_LLM_KEY:
        logger.warning("EMERGENT_LLM_KEY not configured, using mock evaluation")
        return {
            "text": generate_mock_evaluation(audit_data),
            "score": 5,
            "level": "Medio"
        }
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        # Prepare the prompt with business data
        prompt = EVALUATION_MASTER_PROMPT.format(
            nome=audit_data.get('fullName', ''),
            azienda=audit_data.get('companyName', ''),
            settore=audit_data.get('sector', ''),
            area=audit_data.get('geoArea', ''),
            canali=', '.join(audit_data.get('channels', [])),
            obiettivo=audit_data.get('objective', ''),
            budget=audit_data.get('budget', ''),
            problema=audit_data.get('mainProblem', ''),
            tentativi=audit_data.get('previousAttempts', 'Non specificato'),
            importanza=audit_data.get('improvementImportance', 3)
        )
        
        # Initialize chat with GPT-4o
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"audit-{uuid.uuid4()}",
            system_message="Sei un consulente di marketing strategico senior specializzato in analisi e valutazioni per PMI."
        ).with_model("openai", "gpt-4o")
        
        # Send message and get response
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Extract score and level from response (parse from text)
        score = 5  # Default
        level = "Medio"  # Default
        
        # Try to extract score from response
        import re
        score_match = re.search(r'Punteggio.*?(\d+)[/\s]*10', response, re.IGNORECASE)
        if score_match:
            score = int(score_match.group(1))
        
        level_match = re.search(r'Livello.*?maturità.*?(Basso|Medio|Avanzato)', response, re.IGNORECASE)
        if level_match:
            level = level_match.group(1).capitalize()
        
        logger.info(f"AI evaluation generated successfully for {audit_data.get('email')}")
        
        return {
            "text": response,
            "score": score,
            "level": level
        }
        
    except Exception as e:
        logger.error(f"Error generating AI evaluation: {e}")
        return {
            "text": generate_mock_evaluation(audit_data),
            "score": 5,
            "level": "Medio"
        }

def generate_mock_evaluation(audit_data: dict) -> str:
    """Generate a mock evaluation when AI is not available"""
    return f"""VALUTAZIONE STRATEGICA DEL MARKETING

Preparata per: {audit_data.get('companyName', 'N/A')}
Settore: {audit_data.get('sector', 'N/A')}

1. INTRODUZIONE

Questa valutazione analizza la situazione marketing attuale di {audit_data.get('companyName', 'la tua azienda')}, 
operante nel settore {audit_data.get('sector', 'specificato')}.

2. STATO ATTUALE – DIAGNOSI

Sulla base delle informazioni fornite, emergono alcune aree di attenzione:

• Canali utilizzati: {', '.join(audit_data.get('channels', ['Non specificati']))}
• Obiettivo dichiarato: {audit_data.get('objective', 'Non specificato')}
• Problema principale: {audit_data.get('mainProblem', 'Non specificato')}

3. RISCHI PRINCIPALI

Mantenere la situazione invariata potrebbe comportare:
- Dispersione di budget su canali non ottimizzati
- Perdita di opportunità di crescita
- Difficoltà nel raggiungere gli obiettivi prefissati

4. OPPORTUNITÀ DI MIGLIORAMENTO

Esistono margini di miglioramento significativi, in particolare nelle aree di:
- Strategia complessiva
- Ottimizzazione dei canali esistenti
- Misurazione e analisi dei risultati

5. PRIORITÀ STRATEGICHE CONSIGLIATE

1. Definire una strategia marketing chiara e misurabile
2. Ottimizzare l'allocazione del budget sui canali più performanti
3. Implementare un sistema di monitoraggio dei risultati

6. CONCLUSIONE

Un approccio strutturato al marketing può fare la differenza tra investimenti dispersivi 
e crescita sostenibile. Un confronto con un consulente esperto può aiutare a identificare 
il percorso più adatto alla tua situazione specifica.

📊 VALUTAZIONE FINALE:
- Livello di maturità marketing: Medio
- Punteggio complessivo: 5/10
- Il punteggio riflette una situazione con buone basi ma margini di miglioramento 
  significativi nella strategia e nell'esecuzione operativa.

---
Documento riservato – uso informativo
Arxéon – Marketing strategico orientato ai risultati
"""

def generate_pdf_evaluation(evaluation_text: str, audit_data: dict) -> bytes:
    """Generate PDF from evaluation text"""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import cm
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
        from reportlab.lib.colors import HexColor
        from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
        
        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=2*cm,
            leftMargin=2*cm,
            topMargin=2*cm,
            bottomMargin=2*cm
        )
        
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=18,
            spaceAfter=20,
            textColor=HexColor('#1a1a1a'),
            alignment=TA_CENTER
        )
        
        header_style = ParagraphStyle(
            'CustomHeader',
            parent=styles['Heading2'],
            fontSize=14,
            spaceBefore=15,
            spaceAfter=10,
            textColor=HexColor('#333333')
        )
        
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['Normal'],
            fontSize=11,
            leading=16,
            spaceAfter=8,
            alignment=TA_JUSTIFY
        )
        
        footer_style = ParagraphStyle(
            'CustomFooter',
            parent=styles['Normal'],
            fontSize=9,
            textColor=HexColor('#666666'),
            alignment=TA_CENTER
        )
        
        story = []
        
        # Header
        story.append(Paragraph("Arxéon – Valutazione Strategica", title_style))
        story.append(Spacer(1, 0.5*cm))
        story.append(Paragraph(f"Preparata per: {audit_data.get('companyName', 'N/A')}", body_style))
        story.append(Paragraph(f"Data: {datetime.now().strftime('%d/%m/%Y')}", body_style))
        story.append(Spacer(1, 1*cm))
        
        # Process evaluation text
        lines = evaluation_text.split('\n')
        for line in lines:
            line = line.strip()
            if not line:
                story.append(Spacer(1, 0.3*cm))
                continue
            
            # Detect headers (lines with uppercase or numbered sections)
            if line.isupper() or (len(line) > 2 and line[0].isdigit() and '.' in line[:3]):
                story.append(Paragraph(line, header_style))
            elif line.startswith('•') or line.startswith('-'):
                story.append(Paragraph(f"  {line}", body_style))
            elif line.startswith('📊') or line.startswith('---'):
                story.append(Spacer(1, 0.5*cm))
                story.append(Paragraph(line.replace('📊', '').strip(), header_style))
            else:
                # Escape special characters for ReportLab
                line = line.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                story.append(Paragraph(line, body_style))
        
        # Footer
        story.append(Spacer(1, 1*cm))
        story.append(Paragraph("─" * 50, footer_style))
        story.append(Paragraph("Documento riservato – uso informativo", footer_style))
        story.append(Paragraph("Arxéon – Marketing strategico orientato ai risultati", footer_style))
        
        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()
        
    except Exception as e:
        logger.error(f"Error generating PDF: {e}")
        # Return a simple text-based fallback
        return evaluation_text.encode('utf-8')

async def send_confirmation_email_audit(audit_data: dict) -> bool:
    """Send immediate confirmation email (Email 1)"""
    to_email = audit_data.get('email')
    first_name = audit_data.get('fullName', '').split()[0] if audit_data.get('fullName') else 'Cliente'
    
    subject = "Abbiamo ricevuto la tua richiesta di valutazione"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Inter', Arial, sans-serif; background: #f5f5f5; color: #333; padding: 40px; margin: 0; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            h1 {{ color: #1a1a1a; font-size: 24px; margin-bottom: 20px; }}
            p {{ line-height: 1.7; color: #555; margin-bottom: 16px; }}
            .highlight {{ background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #c8f000; margin: 20px 0; }}
            .footer {{ margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 13px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Grazie per la tua richiesta</h1>
            
            <p>Ciao {first_name},</p>
            
            <p>abbiamo ricevuto correttamente la tua richiesta di valutazione strategica.</p>
            
            <p>In questo momento stiamo analizzando le informazioni che ci hai fornito.</p>
            
            <div class="highlight">
                <p style="margin: 0;"><strong>La valutazione verrà controllata e rifinita manualmente</strong> per garantirti un contenuto chiaro e preciso.</p>
            </div>
            
            <p>⏱ Riceverai la tua valutazione via email <strong>entro pochi minuti</strong>.</p>
            
            <div class="footer">
                <p>A presto,<br><strong>Arxéon</strong></p>
                <p>Marketing strategico orientato ai risultati<br>info@arxeon.ch | Lugano, Svizzera</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return await send_email_resend(to_email, subject, html_content)

async def send_evaluation_email_with_pdf(audit_data: dict, pdf_bytes: bytes, evaluation_result: dict) -> bool:
    """Send evaluation email with PDF attachment (Email 2)"""
    to_email = audit_data.get('email')
    first_name = audit_data.get('fullName', '').split()[0] if audit_data.get('fullName') else 'Cliente'
    
    subject = "La tua valutazione strategica è pronta"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Inter', Arial, sans-serif; background: #f5f5f5; color: #333; padding: 40px; margin: 0; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            h1 {{ color: #1a1a1a; font-size: 24px; margin-bottom: 20px; }}
            p {{ line-height: 1.7; color: #555; margin-bottom: 16px; }}
            ul {{ padding-left: 20px; margin: 20px 0; }}
            li {{ margin-bottom: 10px; color: #555; }}
            .cta {{ display: inline-block; background: #c8f000; color: #1a1a1a; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }}
            .cta:hover {{ background: #b8e000; }}
            .score-box {{ background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }}
            .score {{ font-size: 36px; font-weight: bold; color: #c8f000; }}
            .level {{ font-size: 14px; color: #666; margin-top: 5px; }}
            .footer {{ margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 13px; }}
            .secondary-link {{ color: #666; font-size: 13px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>La tua valutazione è pronta</h1>
            
            <p>Ciao {first_name},</p>
            
            <p>in allegato trovi la <strong>valutazione strategica del tuo marketing</strong>, basata sulle informazioni che ci hai fornito.</p>
            
            <div class="score-box">
                <div class="score">{evaluation_result.get('score', 5)}/10</div>
                <div class="level">Livello di maturità: {evaluation_result.get('level', 'Medio')}</div>
            </div>
            
            <p>Il documento evidenzia:</p>
            <ul>
                <li>Le principali <strong>criticità attuali</strong></li>
                <li>I <strong>rischi</strong> se la situazione resta invariata</li>
                <li>Le <strong>priorità strategiche</strong> su cui intervenire</li>
            </ul>
            
            <p>Se vuoi capire come intervenire in modo concreto e quale tipo di supporto è più adatto al tuo caso, puoi esplorare le opzioni disponibili:</p>
            
            <p style="text-align: center;">
                <a href="{FRONTEND_URL}/servizi" class="cta">Scopri i servizi disponibili</a>
            </p>
            
            <p class="secondary-link" style="text-align: center;">
                In alternativa, puoi rispondere a questa email per un primo confronto.
            </p>
            
            <div class="footer">
                <p>A presto,<br><strong>Arxéon</strong></p>
                <p>Marketing strategico orientato ai risultati<br>info@arxeon.ch | Lugano, Svizzera</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return await send_email_resend_with_attachment(to_email, subject, html_content, pdf_bytes, "valutazione-strategica.pdf")

async def send_email_resend_with_attachment(to: str, subject: str, html_content: str, attachment_bytes: bytes, attachment_name: str) -> bool:
    """Send email via Resend with PDF attachment"""
    if RESEND_API_KEY:
        try:
            import resend
            resend.api_key = RESEND_API_KEY
            
            # Encode attachment to base64
            attachment_b64 = base64.b64encode(attachment_bytes).decode('utf-8')
            
            resend.Emails.send({
                "from": "Arxéon <noreply@arxeon.ch>",
                "to": [to],
                "subject": subject,
                "html": html_content,
                "attachments": [
                    {
                        "filename": attachment_name,
                        "content": attachment_b64,
                    }
                ]
            })
            logger.info(f"Email with attachment sent to {to}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email with attachment via Resend: {e}")
    
    # Mock/Log fallback
    logger.info(f"[MOCK EMAIL WITH ATTACHMENT] To: {to}")
    logger.info(f"[MOCK EMAIL] Subject: {subject}")
    logger.info(f"[MOCK EMAIL] Attachment: {attachment_name} ({len(attachment_bytes)} bytes)")
    return True

async def process_audit_background(audit_id: str, audit_data: dict):
    """Background task to generate evaluation and send email after delay"""
    try:
        # Generate AI evaluation
        logger.info(f"Generating AI evaluation for audit {audit_id}")
        evaluation_result = await generate_evaluation_with_ai(audit_data)
        
        # Generate PDF
        logger.info(f"Generating PDF for audit {audit_id}")
        pdf_bytes = generate_pdf_evaluation(evaluation_result['text'], audit_data)
        
        # Update database with evaluation
        await db.free_audits.update_one(
            {'id': audit_id},
            {'$set': {
                'evaluation_text': evaluation_result['text'],
                'evaluation_score': evaluation_result['score'],
                'evaluation_level': evaluation_result['level'],
                'status': 'completed',
                'completed_at': datetime.now(timezone.utc).isoformat()
            }}
        )
        
        # Wait 5 minutes before sending the evaluation email
        logger.info(f"Waiting 5 minutes before sending evaluation email for audit {audit_id}")
        await asyncio.sleep(300)  # 5 minutes = 300 seconds
        
        # Send Email 2 with PDF
        await send_evaluation_email_with_pdf(audit_data, pdf_bytes, evaluation_result)
        
        logger.info(f"Audit {audit_id} completed successfully")
        
    except Exception as e:
        logger.error(f"Error processing audit {audit_id}: {e}")
        await db.free_audits.update_one(
            {'id': audit_id},
            {'$set': {'status': 'error', 'error': str(e)}}
        )

@api_router.post("/free-audit", response_model=FreeAuditResponse)
async def create_free_audit(request: FreeAuditRequest, background_tasks: BackgroundTasks):
    """
    Create a free strategic audit request.
    1. Saves data to DB
    2. Sends immediate confirmation email
    3. Starts background task for AI evaluation + PDF + delayed email
    """
    audit_id = str(uuid.uuid4())
    
    # Prepare audit data
    audit_data = request.model_dump()
    audit_data['id'] = audit_id
    audit_data['status'] = 'pending'
    audit_data['created_at'] = datetime.now(timezone.utc).isoformat()
    
    # Save to database
    await db.free_audits.insert_one(audit_data)
    logger.info(f"Free audit request saved: {audit_id}")
    
    # Send immediate confirmation email (Email 1)
    await send_confirmation_email_audit(audit_data)
    
    # Start background processing (AI + PDF + Email 2 after 5 min)
    background_tasks.add_task(process_audit_background, audit_id, audit_data)
    
    return FreeAuditResponse(
        id=audit_id,
        status="pending",
        message="Richiesta ricevuta. Riceverai la valutazione via email entro pochi minuti."
    )

@api_router.get("/free-audit/{audit_id}")
async def get_free_audit(audit_id: str):
    """Get audit status and details"""
    audit = await db.free_audits.find_one({'id': audit_id}, {'_id': 0})
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")
    return audit

# Include the router after all endpoints are defined
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
