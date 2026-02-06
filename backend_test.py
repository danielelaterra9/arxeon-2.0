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
BACKEND_URL = "https://project-revival-26.preview.emergentagent.com"

def test_api_health_check():
    """Test the API health check endpoint"""
    print("=" * 60)
    print("TESTING API HEALTH CHECK")
    print("=" * 60)
    
    print(f"Testing GET {BACKEND_URL}/api/")
    
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/",
            timeout=30
        )
        
        print(f"\nResponse Status: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"Response Data: {json.dumps(response_data, indent=2)}")
            
            expected_message = "Arxéon API"
            actual_message = response_data.get("message")
            
            if actual_message == expected_message:
                print(f"✅ GET /api/ - SUCCESS")
                print(f"   - Correct message: '{actual_message}'")
                return True
            else:
                print(f"❌ GET /api/ - FAILED: Expected '{expected_message}', got '{actual_message}'")
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

def test_free_audit_endpoint():
    """Test the /api/free-audit endpoint with valid data"""
    print("=" * 60)
    print("TESTING /api/free-audit ENDPOINT")
    print("=" * 60)
    
    # Test data as specified in the review request - EXACT PAYLOAD
    test_data = {
        "fullName": "Test Utente Arxeon",
        "email": "test@arxeon.ch",
        "phone": "+41 79 123 4567",
        "companyName": "Test Company SA",
        "website": "https://testcompany.ch",
        "sector": "technology",
        "geoArea": "ticino",
        "channels": ["social", "ads"],
        "objective": "leads",
        "budget": "1000_2000",
        "mainProblem": "Vorremmo migliorare la nostra presenza online e generare più lead qualificati",
        "previousAttempts": "Abbiamo provato con Facebook Ads ma senza risultati significativi",
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
                response_data.get("fullName") == "Test Utente Arxeon" and
                response_data.get("email") == "test@arxeon.ch"):
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

def test_bilingual_email_system():
    """Test the bilingual email system for Free Audit (French and Italian)"""
    print("\n" + "=" * 60)
    print("TESTING BILINGUAL EMAIL SYSTEM")
    print("=" * 60)
    
    # Test 1: French Email (language: 'fr')
    print("\n🇫🇷 TESTING FRENCH EMAIL (language: 'fr')")
    print("-" * 40)
    
    french_payload = {
        "fullName": "Jean Dupont",
        "email": "test.fr@arxeon.ch",
        "phone": "+41 79 123 4567",
        "companyName": "Entreprise Test SA",
        "website": "https://entreprisetest.ch",
        "sector": "technology",
        "geoArea": "romandie",
        "channels": ["social", "ads"],
        "objective": "leads",
        "budget": "1000_2000",
        "mainProblem": "Nous n'arrivons pas à générer des leads qualifiés",
        "previousAttempts": "Nous avons essayé Facebook Ads sans résultats",
        "improvementImportance": 4,
        "language": "fr"
    }
    
    print(f"POST {BACKEND_URL}/api/free-audit")
    print(f"Payload: {json.dumps(french_payload, indent=2)}")
    
    french_success = False
    french_audit_id = None
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/free-audit",
            json=french_payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Response Status: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"Response: {json.dumps(response_data, indent=2)}")
            
            french_audit_id = response_data.get("id")
            if is_valid_uuid(french_audit_id) and response_data.get("status") == "pending":
                print("✅ French audit request submitted successfully")
                french_success = True
            else:
                print("❌ French audit request failed - invalid response")
        else:
            print(f"❌ French audit request failed - HTTP {response.status_code}")
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"❌ French audit request failed - {e}")
    
    # Wait a moment before next test
    time.sleep(2)
    
    # Test 2: Italian Email (language: 'it')
    print("\n🇮🇹 TESTING ITALIAN EMAIL (language: 'it')")
    print("-" * 40)
    
    italian_payload = {
        "fullName": "Mario Rossi",
        "email": "test.it@arxeon.ch",
        "phone": "+41 79 987 6543",
        "companyName": "Azienda Test SA",
        "website": "https://aziendatest.ch",
        "sector": "consulting",
        "geoArea": "ticino",
        "channels": ["seo", "website"],
        "objective": "awareness",
        "budget": "2000_5000",
        "mainProblem": "Non riusciamo a generare lead qualificati",
        "previousAttempts": "Abbiamo provato con Facebook Ads senza risultati",
        "improvementImportance": 5,
        "language": "it"
    }
    
    print(f"POST {BACKEND_URL}/api/free-audit")
    print(f"Payload: {json.dumps(italian_payload, indent=2)}")
    
    italian_success = False
    italian_audit_id = None
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/free-audit",
            json=italian_payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Response Status: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"Response: {json.dumps(response_data, indent=2)}")
            
            italian_audit_id = response_data.get("id")
            if is_valid_uuid(italian_audit_id) and response_data.get("status") == "pending":
                print("✅ Italian audit request submitted successfully")
                italian_success = True
            else:
                print("❌ Italian audit request failed - invalid response")
        else:
            print(f"❌ Italian audit request failed - HTTP {response.status_code}")
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Italian audit request failed - {e}")
    
    return french_success, italian_success, french_audit_id, italian_audit_id

def check_bilingual_email_logs():
    """Check backend logs specifically for bilingual email subjects"""
    print("\n" + "=" * 60)
    print("CHECKING BACKEND LOGS FOR BILINGUAL EMAIL SUBJECTS")
    print("=" * 60)
    
    try:
        import subprocess
        result = subprocess.run(
            ["tail", "-n", "100", "/var/log/supervisor/backend.err.log"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            logs = result.stdout
            print("Recent backend logs (last 100 lines):")
            print("-" * 50)
            
            # Look for specific email subjects
            french_subject_found = False
            italian_subject_found = False
            
            lines = logs.split('\n')
            for line in lines:
                if "Nous avons reçu votre demande d'évaluation" in line:
                    print(f"✅ FOUND FRENCH EMAIL SUBJECT: {line.strip()}")
                    french_subject_found = True
                elif "Abbiamo ricevuto la tua richiesta di valutazione" in line:
                    print(f"✅ FOUND ITALIAN EMAIL SUBJECT: {line.strip()}")
                    italian_subject_found = True
                elif "MOCK EMAIL" in line and "Subject:" in line:
                    print(f"📧 Email log: {line.strip()}")
                elif "Email sent successfully" in line:
                    print(f"📧 Email sent: {line.strip()}")
                elif "Free audit request saved" in line:
                    print(f"💾 Audit saved: {line.strip()}")
                elif "Generating AI evaluation" in line:
                    print(f"🤖 AI generation: {line.strip()}")
            
            print("\n" + "-" * 50)
            print("BILINGUAL EMAIL VERIFICATION:")
            
            if french_subject_found:
                print("✅ French email subject found: 'Nous avons reçu votre demande d'évaluation'")
            else:
                print("❌ French email subject NOT found")
            
            if italian_subject_found:
                print("✅ Italian email subject found: 'Abbiamo ricevuto la tua richiesta di valutazione'")
            else:
                print("❌ Italian email subject NOT found")
            
            return french_subject_found, italian_subject_found
                
        else:
            print("❌ Could not read backend logs")
            return False, False
            
    except Exception as e:
        print(f"❌ Error checking logs: {e}")
        return False, False

def main():
    """Main test execution for bilingual email system"""
    print("ARXÉON BILINGUAL EMAIL SYSTEM TESTING")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test started at: {datetime.now().isoformat()}")
    
    # Test 0: API Health Check
    health_success = test_api_health_check()
    
    # Test 1: Bilingual Email System
    french_success, italian_success, french_id, italian_id = test_bilingual_email_system()
    
    # Wait a moment for logs to be written
    print("\n⏳ Waiting 3 seconds for logs to be written...")
    time.sleep(3)
    
    # Test 2: Check logs for bilingual email subjects
    french_email_found, italian_email_found = check_bilingual_email_logs()
    
    # Summary
    print("\n" + "=" * 60)
    print("BILINGUAL EMAIL SYSTEM TEST SUMMARY")
    print("=" * 60)
    
    if health_success:
        print("✅ API Health Check - PASSED")
    else:
        print("❌ API Health Check - FAILED")
    
    print("\n🇫🇷 FRENCH EMAIL TEST:")
    if french_success:
        print("✅ French audit submission - PASSED")
        print(f"   - Audit ID: {french_id}")
    else:
        print("❌ French audit submission - FAILED")
    
    if french_email_found:
        print("✅ French email subject in logs - PASSED")
        print("   - Subject: 'Nous avons reçu votre demande d'évaluation'")
    else:
        print("❌ French email subject in logs - NOT FOUND")
    
    print("\n🇮🇹 ITALIAN EMAIL TEST:")
    if italian_success:
        print("✅ Italian audit submission - PASSED")
        print(f"   - Audit ID: {italian_id}")
    else:
        print("❌ Italian audit submission - FAILED")
    
    if italian_email_found:
        print("✅ Italian email subject in logs - PASSED")
        print("   - Subject: 'Abbiamo ricevuto la tua richiesta di valutazione'")
    else:
        print("❌ Italian email subject in logs - NOT FOUND")
    
    # Overall result
    all_tests_passed = (health_success and french_success and italian_success and 
                       french_email_found and italian_email_found)
    
    print("\n" + "=" * 60)
    if all_tests_passed:
        print("🎉 OVERALL RESULT: SUCCESS")
        print("   - Both French and Italian emails working correctly")
        print("   - Email subjects found in backend logs")
    else:
        print("❌ OVERALL RESULT: FAILED")
        print("   - One or more tests failed")
    
    print(f"\nTest completed at: {datetime.now().isoformat()}")

if __name__ == "__main__":
    main()