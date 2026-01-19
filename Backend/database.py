from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

<<<<<<< HEAD
# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# Use absolute path to ensure backend always finds the correct DB regardless of CWD
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'sql_app.db')}"
=======
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
>>>>>>> 54d6d2312537ffaf2fb867d377048567bdb812d0
# For PostgreSQL use: "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
