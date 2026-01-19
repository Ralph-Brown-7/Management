from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, auth
from datetime import date

def create_admin():
    db = SessionLocal()
    
    admin_email = "admin@learnflow.com"
    existing_admin = db.query(models.User).filter(models.User.email == admin_email).first()
    
    if not existing_admin:
        hashed_password = auth.pwd_context.hash("admin123")
        admin_user = models.User(
            full_name="System Admin",
            email=admin_email,
            password_hash=hashed_password,
            role="admin",
            streak=0,
            last_active_date=date.today()
        )
        db.add(admin_user)
        db.commit()
        print(f"Admin user created: {admin_email} / admin123")
    else:
        # Update role just in case
        existing_admin.role = "admin"
        db.commit()
        print(f"Admin user already exists: {admin_email}. Role updated/verified.")
        
    db.close()

if __name__ == "__main__":
    create_admin()
