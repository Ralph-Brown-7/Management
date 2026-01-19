import requests

def test_login():
    url = "http://localhost:8000/login"
    payload = {
        "email": "admin@learnflow.com",
        "password": "admin123"
    }
    with open("api_result.txt", "w") as f:
        try:
            f.write(f"Sending login request to {url} with {payload['email']}...\n")
            response = requests.post(url, json=payload)
            f.write(f"Status Code: {response.status_code}\n")
            f.write(f"Response Body: {response.text}\n")
        except Exception as e:
            f.write(f"Request failed: {e}\n")

if __name__ == "__main__":
    test_login()
