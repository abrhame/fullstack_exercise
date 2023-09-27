from fastapi import FastAPI
import routers.books as books
import database

app = FastAPI()

# Initialize database tables
database.initialize_tables()

# Include routers
app.include_router(books.router, prefix="/api")

# ... (Other code)
