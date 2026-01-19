import sys
import traceback

print("Attempting to import modules individually...")

try:
    print("Importing database...")
    import database
    print("SUCCESS: database")
except Exception:
    traceback.print_exc()

try:
    print("Importing models...")
    import models
    print("SUCCESS: models")
except Exception:
    traceback.print_exc()

try:
    print("Importing schemas...")
    import schemas
    print("SUCCESS: schemas")
except Exception:
    traceback.print_exc()

try:
    print("Importing auth...")
    import auth
    print("SUCCESS: auth")
except Exception:
    traceback.print_exc()

try:
    print("Importing dashboard...")
    import dashboard
    print("SUCCESS: dashboard")
except Exception:
    traceback.print_exc()

try:
    print("Importing main...")
    import main
    print("SUCCESS: main")
except Exception:
    traceback.print_exc()
