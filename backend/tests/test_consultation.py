"""Backend tests for Arxeon API consultation endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ===== Health =====
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "ARXEON" in data.get("message", "")


# ===== Consultation POST =====
class TestConsultationCreate:
    def test_create_valid(self, api_client):
        payload = {
            "company": "TEST_Acme SA",
            "email": "test_acme@example.com",
            "phone": "+39 333 1234567",
            "tier": "Zane",
            "language": "it",
            "message": "Test message",
        }
        r = api_client.post(f"{API}/consultation", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["company"] == payload["company"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["tier"] == "Zane"
        assert data["language"] == "it"
        assert isinstance(data.get("id"), str) and len(data["id"]) > 10
        assert "created_at" in data

    def test_create_minimal_required(self, api_client):
        payload = {
            "company": "TEST_Minimal",
            "email": "minimal@example.com",
            "phone": "0123456",
        }
        r = api_client.post(f"{API}/consultation", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["company"] == "TEST_Minimal"
        assert data.get("language") == "it"  # default

    def test_invalid_email(self, api_client):
        r = api_client.post(f"{API}/consultation", json={
            "company": "TEST_Bad",
            "email": "not-an-email",
            "phone": "0123456",
        })
        assert r.status_code == 422

    def test_missing_company(self, api_client):
        r = api_client.post(f"{API}/consultation", json={
            "email": "ok@example.com",
            "phone": "0123456",
        })
        assert r.status_code == 422

    def test_missing_email(self, api_client):
        r = api_client.post(f"{API}/consultation", json={
            "company": "TEST_X",
            "phone": "0123456",
        })
        assert r.status_code == 422

    def test_missing_phone(self, api_client):
        r = api_client.post(f"{API}/consultation", json={
            "company": "TEST_X",
            "email": "ok@example.com",
        })
        assert r.status_code == 422

    def test_empty_company(self, api_client):
        r = api_client.post(f"{API}/consultation", json={
            "company": "",
            "email": "ok@example.com",
            "phone": "0123456",
        })
        assert r.status_code == 422


# ===== Consultation GET + persistence =====
class TestConsultationList:
    def test_list_after_create(self, api_client):
        # Create
        marker_email = "test_persist_marker@example.com"
        payload = {
            "company": "TEST_PersistCo",
            "email": marker_email,
            "phone": "+39 000 0000",
            "tier": "Arxeon Elite 2.0",
            "language": "fr",
            "message": "persistence check",
        }
        rc = api_client.post(f"{API}/consultation", json=payload)
        assert rc.status_code == 200
        created_id = rc.json()["id"]

        # List
        rl = api_client.get(f"{API}/consultation")
        assert rl.status_code == 200
        items = rl.json()
        assert isinstance(items, list)
        ids = [it["id"] for it in items]
        assert created_id in ids
        match = next(it for it in items if it["id"] == created_id)
        assert match["email"] == marker_email
        assert match["language"] == "fr"
        assert match["tier"] == "Arxeon Elite 2.0"
