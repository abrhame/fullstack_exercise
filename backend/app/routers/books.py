from fastapi import APIRouter, HTTPException, Path, Query, Body
import models
import database

router = APIRouter()

# ... (Previous code)
@router.get("/books/")
async def get_all_books():
    try:
        connection = database.connect_to_database()
        cursor = connection.cursor()
        cursor.execute('SELECT id, title, status FROM books')
        books_data = cursor.fetchall()
        connection.close()

        # Convert the data into a list of Book models
        books = [models.Book(*book_data) for book_data in books_data]
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
# Create a new book entry
@router.post("/books/")
async def create_book(book: models.Book):
    try:
        connection = database.connect_to_database()
        cursor = connection.cursor()
        cursor.execute('INSERT INTO books (title, status) VALUES (?, ?)', (book.title, book.status))
        connection.commit()
        connection.close()
        return {"message": "Book created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Read a specific book by ID
@router.get("/books/{book_id}")
async def read_book(book_id: int = Path(..., title="The ID of the book to retrieve")):
    try:
        connection = database.connect_to_database()
        cursor = connection.cursor()
        cursor.execute('SELECT id, title, status FROM books WHERE id = ?', (book_id,))
        book_data = cursor.fetchone()
        connection.close()
        if not book_data:
            raise HTTPException(status_code=404, detail="Book not found")
        book = models.Book(*book_data)
        return book
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Update a book's status
@router.put("/books/{book_id}/status")
async def update_book_status(
    book_id: int = Path(..., title="The ID of the book to update"),
    status: str = Query(..., title="The new status of the book"),
):
    try:
        connection = database.connect_to_database()
        cursor = connection.cursor()
        cursor.execute('UPDATE books SET status = ? WHERE id = ?', (status, book_id))
        connection.commit()
        connection.close()
        return {"message": "Book status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Delete a book by ID
@router.delete("/books/{book_id}")
async def delete_book(book_id: int = Path(..., title="The ID of the book to delete")):
    try:
        connection = database.connect_to_database()
        cursor = connection.cursor()
        cursor.execute('DELETE FROM books WHERE id = ?', (book_id,))
        connection.commit()
        connection.close()
        return {"message": "Book deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
