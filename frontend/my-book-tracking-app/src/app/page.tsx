"use client"
import { FC, useState } from 'react';
import BookCard from '../app/components/BookCard';
import BookEntryForm from '../app/components/BookEntryForm';


const Home: FC = () => {
  const [books, setBooks] = useState([
    { title: 'Book 1', status: 'to-read' },
    { title: 'Book 2', status: 'in-progress' },
    { title: 'Book 3', status: 'completed' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const addBook = (title: string) => {
    setBooks([...books, { title, status: 'to-read' }]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-screen-xl px-4">
        <h1 className="text-3xl font-semibold mb-4">My Fancy Book Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <BookCard key={index} title={book.title} status={book.status} />
          ))}
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
