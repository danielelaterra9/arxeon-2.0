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
