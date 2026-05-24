from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure logging early so route handlers can use it safely.
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app without a prefix
app = FastAPI(title="Arxeon API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ====================== Models ======================

class ConsultationRequestCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    company: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=3, max_length=40)
    tier: Optional[str] = Field(default=None, max_length=80)
    language: Optional[str] = Field(default="it", max_length=4)
    message: Optional[str] = Field(default=None, max_length=2000)


class ConsultationRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    email: str
    phone: str
    tier: Optional[str] = None
    language: Optional[str] = "it"
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ====================== Routes ======================

@api_router.get("/")
async def root():
    return {"message": "ARXEON API · AI Factory", "status": "ok"}


@api_router.post("/consultation", response_model=ConsultationRequest)
async def create_consultation(payload: ConsultationRequestCreate):
    obj = ConsultationRequest(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.consultations.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to persist consultation")
        raise HTTPException(status_code=500, detail="Unable to save your request. Please retry.") from e
    return obj


@api_router.get("/consultation", response_model=List[ConsultationRequest])
async def list_consultations(limit: int = 100):
    docs = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            try:
                d['created_at'] = datetime.fromisoformat(d['created_at'])
            except ValueError:
                d['created_at'] = datetime.now(timezone.utc)
    return docs


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
