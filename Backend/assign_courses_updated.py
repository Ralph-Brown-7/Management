from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

def assign_courses():
    db = SessionLocal()
    instructor_name = "Prof. Gideon"
    
    # Get courses that are NOT Gideon's
    courses = db.query(models.Course).filter(models.Course.instructor != instructor_name).limit(5).all()
    
    print(f"Found {len(courses)} courses to re-assign to {instructor_name}...")
    
    for course in courses:
        print(f"Re-assigning '{course.title}' (was {course.instructor}) -> {instructor_name}")
        course.instructor = instructor_name
        
    db.commit()
    print("Done! Dashboard should now be populated.")
    db.close()

if __name__ == "__main__":
    assign_courses()
