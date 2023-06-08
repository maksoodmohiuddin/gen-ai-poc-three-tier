import React from 'react';
import './BookList.css';

function BookList() {
  // Sample book data
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
  ];

  return (
    <div>
      <h2>Book List</h2>
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id}>
            <a href={`/book/${book.id}`}>{book.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
