from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, timedelta
import models, schemas, auth
from database import get_db

router = APIRouter(tags=["Dashboard"])

# Helper to get current user from token (simplified for this context)
def get_current_user(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except auth.JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == username).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/dashboard", response_model=schemas.DashboardData)
def get_dashboard_data(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    enrollments = db.query(models.Enrollment).filter(models.Enrollment.user_id == current_user.id).all()
    
    # Check if daily goal was completed TODAY
    today = date.today()
    is_goal_done = False
    if current_user.daily_goal_date == today and current_user.daily_goal_completed == 1:
        is_goal_done = True
    elif current_user.daily_goal_date != today:
        # Reset goal status for a new day (but don't commit yet, just update return value)
        is_goal_done = False

    # Calculate stats
    total_hours = sum([e.course.level == 'Advanced' and 40 or 20 for e in enrollments])
    courses_in_progress = len([e for e in enrollments if e.status == 'active'])
    certificates_earned = len([e for e in enrollments if e.status == 'completed'])
    
    average_score = 0
    if enrollments:
        average_score = 85 

    return {
        "total_hours": total_hours,
        "streak": current_user.streak,
        "level": current_user.level or 1,
        "xp": current_user.xp or 0,
        "daily_goal_completed": is_goal_done,
        "courses_in_progress": courses_in_progress,
        "certificates_earned": certificates_earned,
        "average_score": average_score,
        "enrollments": enrollments,
        "recent_activity": []
    }

class GamificationUpdate(schemas.BaseModel):
    xp_gained: int

@router.post("/gamification/update")
def update_gamification(update: GamificationUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    current_user.xp += update.xp_gained
    
    # Simple level up logic: 100 XP per level
    # If XP >= 100, level up and reduce XP
    # Note: Frontend also has this logic for visuals, but backend is source of truth
    while current_user.xp >= 100:
        current_user.level += 1
        current_user.xp -= 100
        
    db.commit()
    return {"level": current_user.level, "xp": current_user.xp}

@router.post("/daily-goal/complete")
def complete_daily_goal(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    today = date.today()
    
    if current_user.daily_goal_date == today and current_user.daily_goal_completed == 1:
        return {"message": "Goal already completed today", "streak": current_user.streak}
    
    # Update Streak Logic
    yesterday = today - timedelta(days=1)
    
    if current_user.last_active_date == today:
        # Already active today, just ensuring goal is marked
        pass
    elif current_user.last_active_date == yesterday:
        # Consecutive day
        current_user.streak += 1
    else:
        # Streak broken or first time
        current_user.streak = 1
        
    current_user.daily_goal_completed = 1
    current_user.daily_goal_date = today
    current_user.last_active_date = today
    
    db.commit()
    return {"message": "Daily goal completed!", "streak": current_user.streak}

@router.post("/courses", response_model=schemas.Course)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    db_course = models.Course(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.get("/courses", response_model=List[schemas.Course])
def get_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    courses = db.query(models.Course).offset(skip).limit(limit).all()
    return courses

@router.post("/enroll/{course_id}")
def enroll_course(course_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Check if already enrolled
    existing_enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id,
        models.Enrollment.course_id == course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    
    new_enrollment = models.Enrollment(
        user_id=current_user.id,
        course_id=course_id,
        progress=0,
        status="active"
    )
    db.add(new_enrollment)
    db.commit()
    return {"message": "Enrolled successfully"}

@router.put("/enroll/{course_id}/progress")
def update_progress(course_id: int, progress: int, last_lesson: Optional[str] = None, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id,
        models.Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    
    enrollment.progress = progress
    if last_lesson:
        enrollment.last_lesson = last_lesson
        
    if progress >= 100:
        enrollment.status = "completed"
        enrollment.progress = 100
    
    db.commit()
    return {"message": "Progress updated", "progress": enrollment.progress, "status": enrollment.status, "last_lesson": enrollment.last_lesson}
