'use client'
import { FC, useEffect, useState } from 'react';
import { getAllBooks, createBook, updateBookStatus, deleteBook } from '../app/api/api';
import BookCard from '../app/components/BookCard';
import BookEntryForm from '../app/components/BookEntryForm';

interface Book {
  id: number;
  title: string;
  status: string;
}

const Home: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch all books from the backend when the component mounts
    getAllBooks()
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, []);

  const addBook = (title: string) => {
    // Create a new book and add it to the state
    console.log(title)
    createBook(title, 'to-read')
      .then((data) => {
        setBooks((prevBooks) => [...prevBooks, data]); // Use the functional update
        setShowForm(false);
        getAllBooks()
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleTransition = (bookId: number, newStatus: string) => {
    // Update the book's status and update the state
    updateBookStatus(bookId, newStatus)
      .then(() => {
        const updatedBooks = books.map((book) =>
          book.id === bookId ? { ...book, status: newStatus } : book
        );
        setBooks(updatedBooks);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (bookId: number) => {
    // Delete the book and remove it from the state
    deleteBook(bookId)
      .then(() => {
        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 py-8 ">
      <div className="container mx-auto max-w-screen-xl px-4">
        <h1 className="text-3xl font-semibold mb-4 ">My Book Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-200 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Books to Read</h2>
            <div className="grid gap-4">
              {books
                .filter((book) => book.status === 'to-read')
                .map((book) => (
                  <BookCard
                    key={book.id}
                    title={book.title}
                    status={book.status}
                    onTransition={() => handleTransition(book.id, 'in-progress')}
                    onDelete={() => handleDelete(book.id)}
                  />
                ))}
            </div>
          </div>

          <div className="bg-blue-200 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">In Progress</h2>
            <div className="grid gap-4">
              {books
                .filter((book) => book.status === 'in-progress')
                .map((book) => (
                  <BookCard
                    key={book.id}
                    title={book.title}
                    status={book.status}
                    onTransition={() => handleTransition(book.id, 'completed')}
                    onDelete={() => handleDelete(book.id)}
                  />
                ))}
            </div>
          </div>

          <div className="bg-green-200 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Completed</h2>
            <div className="grid gap-4">
              {books
                .filter((book) => book.status === 'completed')
                .map((book) => (
                  <BookCard
                    key={book.id}
                    title={book.title}
                    status={book.status}
                    onDelete={() => handleDelete(book.id)}
                  />
                ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-8 hover:bg-blue-600 transition-colors"
        >
          Add New Book
        </button>
      </div>
      {showForm && <BookEntryForm onAddBook={addBook} />}
    </div>
  );
};

export default Home;
