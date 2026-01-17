from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import traceback
from database import engine, Base
import models
import auth

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="LearnFlow API")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"\n--- Incoming request: {request.method} {request.url} ---")
    print(f"Headers: {request.headers}")
    try:
        response = await call_next(request)
        print(f"Response status: {response.status_code}")
        return response
    except Exception as e:
        print(f"Request failed with error: {str(e)}")
        print(traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={"detail": f"Internal Server Error: {str(e)}"}
        )

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"CRITICAL ERROR: {exc}")
    print(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred on the server."}
    )

import dashboard

app.include_router(auth.router)
app.include_router(dashboard.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to LearnFlow API"}
