from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, date
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import ValidationError

import models
import schemas
from database import get_db

from fastapi.security import OAuth2PasswordBearer

router = APIRouter(tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Configuration (In a real app, use environment variables)
SECRET_KEY = "YOUR_SUPER_SECRET_KEY_HERE"  # CHANGE THIS!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(f"Attempting to register user: {user.email}")
    try:
        db_user = db.query(models.User).filter(models.User.email == user.email).first()
        if db_user:
            print(f"Registration failed: Email {user.email} already exists")
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = get_password_hash(user.password)
        new_user = models.User(
            email=user.email,
            full_name=user.full_name,
            password_hash=hashed_password,
            role=user.role
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print(f"User {user.email} registered successfully!")
        return new_user
    except Exception as e:
        print(f"Database error during registration: {str(e)}")
        db.rollback()
        raise e

@router.post("/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user or not verify_password(user_credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Streak Logic
    today = date.today()
    if user.last_active_date:
        delta = today - user.last_active_date
        if delta.days == 1:
            user.streak += 1
        elif delta.days > 1:
            user.streak = 1
        # If delta.days == 0 (same day), do nothing
    else:
        user.streak = 1
    
    user.last_active_date = today
    db.commit()
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_name": user.full_name,
        "role": user.role
    }


