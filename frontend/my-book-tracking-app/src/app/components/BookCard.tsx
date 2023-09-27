import { FC } from 'react';

interface BookCardProps {
  title: string;
  status: string;
  onDelete?: () => void; // Add onDelete prop
  onTransition?: () => void; // Add onTransition prop
}

const BookCard: FC<BookCardProps> = ({ title, status, onDelete, onTransition }) => {
  const cardClasses: { [key: string]: string } = {
    'to-read': 'bg-yellow-200',
    'in-progress': 'bg-blue-200',
    completed: 'bg-green-200',
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105 cursor-pointer ${cardClasses[status as keyof typeof cardClasses]}`}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="text-sm text-gray-600">Status: {status}</div>
      {onDelete && (
        <button onClick={onDelete} className="text-red-600 hover:text-red-800 mt-2">
          Delete
        </button>
      )}
      {onTransition && (
        <button onClick={onTransition} className="text-blue-600 hover:text-blue-800 mt-2 ml-2">
          Move
        </button>
      )}
    </div>
  );
};

export default BookCard;
