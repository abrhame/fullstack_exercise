import { FC, useState } from 'react';
import axios from 'axios';

interface BookEntryFormProps {
  onAddBook: (title: string) => void;
}

const BookEntryForm: FC<BookEntryFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const id = 0
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook(title);
    setTitle('');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border rounded-lg py-2 px-3 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookEntryForm;
