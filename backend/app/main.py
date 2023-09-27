from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import routers.books as books
import database

app = FastAPI()

# Initialize database tables
database.initialize_tables()

# CORS Configuration
origins = [
    "http://localhost:3000",  # Add your frontend URL here
    "https://your-production-frontend.com",  # Add your production URL here
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(books.router, prefix="/api")

# ... (Other code)
