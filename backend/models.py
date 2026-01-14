from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="student") # student, instructor, admin
    streak = Column(Integer, default=0)
    last_active_date = Column(Date, nullable=True)
    daily_goal_completed = Column(Integer, default=0) # 0 for false, 1 for true (SQLite friendly)
    daily_goal_date = Column(Date, nullable=True)
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    enrollments = relationship("Enrollment", back_populates="user")

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    image = Column(String) # URL to cloud/local image
    instructor = Column(String)
    level = Column(String) # Beginner, Intermediate, Advanced

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    progress = Column(Integer, default=0)
    status = Column(String, default="active") # active, completed
    last_lesson = Column(String, nullable=True)
    
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course")

