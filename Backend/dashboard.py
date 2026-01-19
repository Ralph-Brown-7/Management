from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, timedelta
import models, schemas, auth
from database import get_db
from sqlalchemy import func

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

@router.get("/admin/dashboard", response_model=schemas.AdminDashboardData)
def get_admin_dashboard_data(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in ["admin", "instructor"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Filter for Instructor
    course_filter = {}
    if current_user.role == "instructor":
        # Match by exact name based on seed data
        course_filter = {"instructor": current_user.full_name}

    # Helper to build queries
    def apply_filter(query, model):
        if current_user.role == "instructor":
            return query.filter(model.instructor == current_user.full_name)
        return query

    # Total Courses
    courses_query = db.query(models.Course)
    if current_user.role == "instructor":
        courses_query = courses_query.filter(models.Course.instructor == current_user.full_name)
    total_courses = courses_query.count()

    # Total Students (Unique students enrolled in my courses)
    # This is a bit complex with current models, simplifying to count of enrollments for my courses
    # Join Enrollment -> Course
    enrollments_query = db.query(models.Enrollment).join(models.Course)
    if current_user.role == "instructor":
        enrollments_query = enrollments_query.filter(models.Course.instructor == current_user.full_name)
    
    total_enrollments_count = enrollments_query.count() # Treat as "students" for dashboard

    if current_user.role == "admin":
         # Admin sees total unique students in platform
         total_students = db.query(models.User).filter(models.User.role == "student").count()
    else:
         total_students = total_enrollments_count # Approximation for instructor

    
    # Revenue
    enrollments = enrollments_query.all()
    revenue = 0
    for enr in enrollments:
        revenue += enr.course.price if enr.course.price else 0

    # Recent Enrollments
    recent_enrollments_query = db.query(models.Enrollment).join(models.Course)
    if current_user.role == "instructor":
         recent_enrollments_query = recent_enrollments_query.filter(models.Course.instructor == current_user.full_name)
    
    recent_req = recent_enrollments_query.order_by(models.Enrollment.id.desc()).limit(5).all()
    
    recent_data = []
    for enr in recent_req:
        recent_data.append({
            "course_title": enr.course.title,
            "student_name": enr.user.full_name,
            "date": "2026-01-18", # Placeholder
            "status": enr.status,
            "price": enr.course.price if enr.course.price else 0
        })

    # Course Performance
    # Filter courses then count enrollments
    courses = courses_query.all()
    
    course_performance = []
    # Manual aggregation for simplicity since filtering logic is mixed
    for course in courses:
        student_count = db.query(models.Enrollment).filter(models.Enrollment.course_id == course.id).count()
        course_performance.append({
            "title": course.title,
            "students": student_count,
            "earnings": student_count * (course.price or 0),
            "image": course.image,
            "status": "active"
        })
    
    # Sort top 5
    course_performance.sort(key=lambda x: x['students'], reverse=True)
    course_performance = course_performance[:5]

    # Mock Revenue Analytics (12 months)
    import random
    revenue_analytics = [random.randint(1000, 5000) for _ in range(12)]

    # Students List (from enrollments)
    students_list = []
    # Reuse enrollments_query which filters for instructor's courses
    # Need to load User data. Already joined? No, joined Course.
    # New query to join user properly or iterate existing result if efficient.
    # enrollments_query already joins Course. Let's make sure we access user.
    # query(models.Enrollment).join(models.Course)
    # We should eager load user to be safe: .options(joinedload(models.Enrollment.user)) if eager loading was set up, 
    # but for now standard lazy load should work or simple join.
    
    # Let's run a specific query for the students list to be clean
    student_enrollments = enrollments_query.all() # This gets all enrollments for instructor
    
    for enr in student_enrollments:
        # Determine status based on progress/activity (mock logic heavily used in frontend too)
        # Using basic logic here
        student_status = "Active"
        if enr.progress >= 100: student_status = "Completed"
        elif enr.progress < 20: student_status = "Lazy"  # Matches user terminology
        elif enr.progress < 50: student_status = "At Risk"
        
        students_list.append({
            "id": enr.user.id,
            "name": enr.user.full_name,
            "course": enr.course.title,
            "progress": enr.progress,
            "status": student_status,
            "xp": enr.user.xp or 0,
            "last_active": "Today", # Placeholder
            "avatar": None # Placeholder
        })
        
    # Calculate Total XP
    total_xp = sum(s['xp'] for s in students_list)

    return {
        "total_courses": total_courses,
        "total_students": total_students,
        "revenue": revenue,
        "average_rating": 4.8, 
        "active_courses_count": total_courses, 
        "recent_enrollments": recent_data,
        "revenue_analytics": revenue_analytics,
        "course_performance": course_performance,
        "students": students_list,
        "total_xp": total_xp
    }

@router.get("/activity-logs")
def get_activity_logs(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get recent activity logs for admin dashboard"""
    if current_user.role not in ["admin", "instructor"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Get the 10 most recent activity logs
    logs = db.query(models.ActivityLog).order_by(models.ActivityLog.timestamp.desc()).limit(10).all()
    
    from datetime import datetime
    
    def get_relative_time(timestamp):
        """Convert timestamp to relative time string"""
        now = datetime.utcnow()
        diff = now - timestamp
        
        if diff.total_seconds() < 60:
            return "Just now"
        elif diff.total_seconds() < 3600:
            minutes = int(diff.total_seconds() / 60)
            return f"{minutes} min{'s' if minutes > 1 else ''} ago"
        elif diff.total_seconds() < 86400:
            hours = int(diff.total_seconds() / 3600)
            return f"{hours} hour{'s' if hours > 1 else ''} ago"
        else:
            days = int(diff.total_seconds() / 86400)
            return f"{days} day{'s' if days > 1 else ''} ago"
    
    result = []
    for log in logs:
        result.append({
            "user_email": log.user_email,
            "role": log.role,
            "action": log.action,
            "status": log.status,
            "time": get_relative_time(log.timestamp)
        })
    
    return result
