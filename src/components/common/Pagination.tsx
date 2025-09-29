import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const start = Math.max(0, currentPage - 2);
    const end = Math.min(totalPages, start + 5);

    if (totalPages > 5 && end - start < 5) {
        if (end === totalPages) {
            const newStart = Math.max(0, end - 5);
            for (let i = newStart; i < end; i++) {
                pageNumbers.push(i);
            }
        } else {
            const newEnd = Math.min(totalPages, start + 5);
            for (let i = start; i < newEnd; i++) {
                pageNumbers.push(i);
            }
        }
    } else {
        for (let i = start; i < end; i++) {
            pageNumbers.push(i);
        }
    }

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => onPageChange(number)}
        className={`px-4 py-2 rounded ${
          currentPage === number
            ? 'bg-main-red'
            : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {number + 1}
      </button>
    ));
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
