from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, auth
from datetime import date

def seed():
    # Only run if called directly
    db = SessionLocal()
    
    # Check if courses exist
    if db.query(models.Course).count() == 0:
        courses = [
            models.Course(
                title="Python for Beginners",
                description="Learn Python from scratch",
                image="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800",
                instructor="Guido V.",
                level="Novice"
            ),
            models.Course(
                title="Web Design Fundamentals",
                description="Master HTML and CSS",
                image="https://images.unsplash.com/photo-1509395062549-31cd4bf24054?q=80&w=800",
                instructor="Alice Lee",
                level="Beginner"
            ),
            models.Course(
                title="Advanced AI & ML",
                description="Deep dive into neural networks",
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
                instructor="Dr. Smith",
                level="Advanced"
            )
        ]
        db.add_all(courses)
        print("Courses seeded")
        
    # Create test user
    test_user_email = "test@example.com"
    if not db.query(models.User).filter(models.User.email == test_user_email).first():
        hashed_password = auth.pwd_context.hash("password")
        user = models.User(
            full_name="Test Student",
            email=test_user_email,
            password_hash=hashed_password,
            streak=1,
            last_active_date=date.today()
        )
        db.add(user)
        print("Test user created: test@example.com / password")
        
    db.commit()
    db.close()

if __name__ == "__main__":
    # Ensure tables are created first
    models.Base.metadata.create_all(bind=engine)
    seed()
