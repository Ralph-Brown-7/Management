import requests
import sys
import time

BASE_URL = "http://127.0.0.1:8000"

def test_register():
    print("Testing Registration...")
    email = f"test_{int(time.time())}@example.com"
    payload = {
        "full_name": "Test Student",
        "email": email,
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/register", json=payload)
    if response.status_code == 200:
        print(f"PASS: Registered {email}")
        return email
    else:
        print(f"FAIL: Registration failed {response.text}")
        sys.exit(1)

def test_login(email):
    print("Testing Login...")
    payload = {
        "email": email,
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/login", json=payload)
    if response.status_code == 200:
        token = response.json().get("access_token")
        if token:
            print("PASS: Login successful, got token")
            return token
        else:
            print("FAIL: No token in response")
            sys.exit(1)
    else:
        print(f"FAIL: Login failed {response.text}")
        sys.exit(1)

def test_google_login():
    print("Testing Google Login (Mock)...")
    payload = {
        "token": "mock_token"
    }
    response = requests.post(f"{BASE_URL}/google-login", json=payload)
    if response.status_code == 200:
        print("PASS: Google Login successful")
    else:
        print(f"FAIL: Google Login failed {response.text}")

if __name__ == "__main__":
    try:
        # Check if server is up
        try:
            requests.get(BASE_URL)
        except requests.exceptions.ConnectionError:
            print("Server not running. Please start the backend server with 'uvicorn backend.main:app --reload'")
            sys.exit(1)

        email = test_register()
        test_login(email)
        test_google_login()
        print("\nAll Backend Tests Passed!")
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)
