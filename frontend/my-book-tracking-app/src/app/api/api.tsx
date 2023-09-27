// api.ts

const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your backend URL

export async function getAllBooks() {
  const response = await fetch(`${API_BASE_URL}/books/`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}
const id = 0
export async function createBook(title: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/books/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id, title, status }),
  });
  if (!response.ok) {
    throw new Error('Failed to create a book');
  }
  return response.json();
}

export async function updateBookStatus(bookId: number, status: string) {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}/status?status=${status}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update book status');
  }
  return response.json();
}

export async function deleteBook(bookId: number) {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete the book');
  }
  return response.json();
}
