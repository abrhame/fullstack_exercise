// components/BookCard.tsx
import { FC } from 'react';

interface BookCardProps {
  title: string;
  status: string;
}

const BookCard: FC<BookCardProps> = ({ title, status }) => {
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
        </div>
    );
};

export default BookCard;
