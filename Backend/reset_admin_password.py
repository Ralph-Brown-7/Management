from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, auth

def reset_admin():
    db = SessionLocal()
    
    admin_email = "admin@learnflow.com"
    user = db.query(models.User).filter(models.User.email == admin_email).first()
    
    if user:
        print(f"Found user: {user.email}, Role: {user.role}")
        # Force update password
        hashed_password = auth.pwd_context.hash("admin123")
        user.password_hash = hashed_password
        user.role = "admin" # Ensure role is admin
        db.commit()
        print("Password reset to 'admin123' and role confirmed as 'admin'.")
    else:
        print("Admin user NOT FOUND. Creating new one...")
        hashed_password = auth.pwd_context.hash("admin123")
        new_admin = models.User(
            full_name="System Admin",
            email=admin_email,
            password_hash=hashed_password,
            role="admin",
            streak=0
        )
        db.add(new_admin)
        db.commit()
        print("Admin user created.")
        
    db.close()

if __name__ == "__main__":
    reset_admin()
