from pydantic import BaseModel, EmailStr
from typing import Optional

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
    enrollments: list[Enrollment]
    recent_activity: list[str] # Placeholder for now
