from pydantic import BaseModel, EmailStr
<<<<<<< HEAD
from typing import Optional, List
=======
from typing import Optional
>>>>>>> 54d6d2312537ffaf2fb867d377048567bdb812d0

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    full_name: str
    password: str
    role: str = "student"

class UserLogin(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    full_name: str
    role: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_name: str
    role: str

class CourseBase(BaseModel):
    title: str
    description: str
    image: str
    instructor: str
    level: str
<<<<<<< HEAD
    price: int
    category: str
    duration: str
=======
>>>>>>> 54d6d2312537ffaf2fb867d377048567bdb812d0

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    class Config:
        orm_mode = True

class EnrollmentBase(BaseModel):
    progress: int
    status: str

class Enrollment(EnrollmentBase):
    id: int
    course: Course
    last_lesson: Optional[str]
    class Config:
        orm_mode = True

class DashboardData(BaseModel):
    total_hours: int
    streak: int
    level: int
    xp: int
    daily_goal_completed: bool
    courses_in_progress: int
    certificates_earned: int
    average_score: int
<<<<<<< HEAD
    enrollments: List[Enrollment]
    recent_activity: List[str] # Placeholder for now

class StudentDisplay(BaseModel):
    id: int
    name: str
    course: str
    progress: int
    status: str
    xp: int
    last_active: str
    avatar: Optional[str] = None

class AdminEnrollmentDisplay(BaseModel):
    course_title: str
    student_name: str
    date: str
    status: str
    price: int # Added price

class AdminCoursePerformance(BaseModel):
    title: str
    students: int
    earnings: int
    image: str
    status: str # active/draft

class AdminDashboardData(BaseModel):
    total_courses: int
    total_students: int
    revenue: int
    average_rating: float
    active_courses_count: int
    recent_enrollments: List[AdminEnrollmentDisplay]
    revenue_analytics: List[int] # List of 12 monthly revenue values
    course_performance: List[AdminCoursePerformance]
    students: List[StudentDisplay]
    total_xp: int # Added XP aggregation
=======
    enrollments: list[Enrollment]
    recent_activity: list[str] # Placeholder for now
>>>>>>> 54d6d2312537ffaf2fb867d377048567bdb812d0
