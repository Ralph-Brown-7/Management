from sqlalchemy.orm import Session
from database import SessionLocal
import models
import auth

def debug_hash():
    db = SessionLocal()
    email = "admin@learnflow.com"
    password = "admin123"
    
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        print("User not found!")
        return

    print(f"Stored Hash: {user.password_hash}")
    
    # Test current hash
    try:
        is_valid = auth.verify_password(password, user.password_hash)
        print(f"Verification of 'admin123' against STORED hash: {is_valid}")
    except Exception as e:
        print(f"Error validating stored hash: {e}")

    # Generate new hash
    new_hash = auth.get_password_hash(password)
    print(f"Generated NEW hash: {new_hash}")
    
    # Test new hash
    is_valid_new = auth.verify_password(password, new_hash)
    print(f"Verification of 'admin123' against NEW hash: {is_valid_new}")
    
    if is_valid_new:
        print("Updating DB with new hash...")
        user.password_hash = new_hash
        db.commit()
        print("DB Updated.")
    else:
        print("CRITICAL: Even new hash failed verification!")

if __name__ == "__main__":
    debug_hash()
