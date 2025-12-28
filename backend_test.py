#!/usr/bin/env python3
"""
Backend API Testing for Arxéon Free Audit Endpoint
Tests the /api/free-audit endpoint functionality
"""

import requests
import json
import time
import uuid
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://arxeon-payment.preview.emergentagent.com"

def test_free_audit_endpoint():
    """Test the /api/free-audit endpoint with valid data"""
    print("=" * 60)
    print("TESTING /api/free-audit ENDPOINT")
    print("=" * 60)
    
    # Test data as specified in the review request
    test_data = {
        "fullName": "Test User",
        "email": "test@example.com",
        "phone": "+41 123 456 789",
        "companyName": "Test Company SA",
        "website": "https://testcompany.ch",
        "sector": "technology",
        "geoArea": "ticino",
        "channels": ["social", "ads"],
        "objective": "acquisizione",
        "budget": "500-1000",
        "mainProblem": "Non riesco a generare lead qualificati dai social media",
        "previousAttempts": "Ho provato con campagne Facebook ma senza risultati significativi",
        "improvementImportance": 4
    }
    
    print(f"Testing POST {BACKEND_URL}/api/free-audit")
    print(f"Request data: {json.dumps(test_data, indent=2)}")
    
    try:
        # Make POST request
        response = requests.post(
            f"{BACKEND_URL}/api/free-audit",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"\nResponse Status: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"Response Data: {json.dumps(response_data, indent=2)}")
            
            # Verify response structure
            required_fields = ["id", "status", "message"]
            missing_fields = []
            
            for field in required_fields:
                if field not in response_data:
                    missing_fields.append(field)
            
            if missing_fields:
                print(f"❌ FAILED: Missing required fields: {missing_fields}")
                return None
            
            # Verify field values
            audit_id = response_data.get("id")
            status = response_data.get("status")
            message = response_data.get("message")
            
            print(f"\n✅ Response validation:")
            print(f"   - ID: {audit_id} (UUID format: {'✅' if is_valid_uuid(audit_id) else '❌'})")
            print(f"   - Status: {status} (Expected 'pending': {'✅' if status == 'pending' else '❌'})")
            print(f"   - Message: {message}")
            
            if status == "pending" and is_valid_uuid(audit_id):
                print(f"\n✅ POST /api/free-audit - SUCCESS")
                return audit_id
            else:
                print(f"\n❌ POST /api/free-audit - FAILED: Invalid response values")
                return None
                
        else:
            print(f"❌ FAILED: HTTP {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error details: {json.dumps(error_data, indent=2)}")
            except:
                print(f"Error text: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request error - {e}")
        return None
    except Exception as e:
        print(f"❌ FAILED: Unexpected error - {e}")
        return None

def test_get_audit_endpoint(audit_id):
    """Test GET /api/free-audit/{id} endpoint"""
    print("\n" + "=" * 60)
    print("TESTING GET /api/free-audit/{id} ENDPOINT")
    print("=" * 60)
    
    if not audit_id:
        print("❌ SKIPPED: No audit ID available from POST test")
        return False
    
    print(f"Testing GET {BACKEND_URL}/api/free-audit/{audit_id}")
    
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/free-audit/{audit_id}",
            timeout=30
        )
        
        print(f"\nResponse Status: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"Response Data: {json.dumps(response_data, indent=2)}")
            
            # Verify the audit was saved correctly
            expected_fields = ["id", "status", "fullName", "email", "companyName", "created_at"]
            found_fields = []
            missing_fields = []
            
            for field in expected_fields:
                if field in response_data:
                    found_fields.append(field)
                else:
                    missing_fields.append(field)
            
            print(f"\n✅ Field validation:")
            print(f"   - Found fields: {found_fields}")
            if missing_fields:
                print(f"   - Missing fields: {missing_fields}")
            
            # Verify key data matches
            if (response_data.get("id") == audit_id and 
                response_data.get("fullName") == "Test User" and
                response_data.get("email") == "test@example.com"):
                print(f"\n✅ GET /api/free-audit/{audit_id} - SUCCESS")
                print(f"   - Audit data saved correctly")
                return True
            else:
                print(f"\n❌ GET /api/free-audit/{audit_id} - FAILED: Data mismatch")
                return False
                
        elif response.status_code == 404:
            print(f"❌ FAILED: Audit not found (404)")
            return False
        else:
            print(f"❌ FAILED: HTTP {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error details: {json.dumps(error_data, indent=2)}")
            except:
                print(f"Error text: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request error - {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error - {e}")
        return False

def check_backend_logs():
    """Check backend logs for background task execution"""
    print("\n" + "=" * 60)
    print("CHECKING BACKEND LOGS FOR BACKGROUND TASKS")
    print("=" * 60)
    
    try:
        import subprocess
        result = subprocess.run(
            ["tail", "-n", "50", "/var/log/supervisor/backend.err.log"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            logs = result.stdout
            print("Recent backend logs:")
            print("-" * 40)
            print(logs)
            
            # Look for relevant log entries
            if "Free audit request saved" in logs:
                print("✅ Found: Audit request saved log")
            if "MOCK EMAIL" in logs or "Email sent successfully" in logs:
                print("✅ Found: Email sending activity")
            if "Generating AI evaluation" in logs:
                print("✅ Found: AI evaluation generation")
            if "Background task" in logs or "process_audit_background" in logs:
                print("✅ Found: Background task execution")
                
        else:
            print("❌ Could not read backend logs")
            
    except Exception as e:
        print(f"❌ Error checking logs: {e}")

def is_valid_uuid(uuid_string):
    """Check if string is a valid UUID"""
    try:
        uuid.UUID(uuid_string)
        return True
    except ValueError:
        return False

def main():
    """Main test execution"""
    print("ARXÉON BACKEND API TESTING")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test started at: {datetime.now().isoformat()}")
    
    # Test 1: POST /api/free-audit
    audit_id = test_free_audit_endpoint()
    
    # Test 2: GET /api/free-audit/{id}
    get_success = test_get_audit_endpoint(audit_id)
    
    # Test 3: Check logs for background processing
    check_backend_logs()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    if audit_id:
        print("✅ POST /api/free-audit - PASSED")
        print("   - Returns valid UUID")
        print("   - Status is 'pending'")
        print("   - Contains required message")
    else:
        print("❌ POST /api/free-audit - FAILED")
    
    if get_success:
        print("✅ GET /api/free-audit/{id} - PASSED")
        print("   - Audit data retrieved successfully")
        print("   - Data matches input")
    else:
        print("❌ GET /api/free-audit/{id} - FAILED")
    
    print("\n📧 Expected behavior:")
    print("   - Email 1: Immediate confirmation (check logs)")
    print("   - Background task: AI generation started")
    print("   - Email 2: Evaluation with PDF (after 5 minutes)")
    
    if audit_id and get_success:
        print(f"\n🎉 OVERALL RESULT: SUCCESS")
        print(f"   Audit ID for reference: {audit_id}")
    else:
        print(f"\n❌ OVERALL RESULT: FAILED")
    
    print(f"\nTest completed at: {datetime.now().isoformat()}")

if __name__ == "__main__":
    main()