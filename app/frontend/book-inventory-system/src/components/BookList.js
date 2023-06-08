import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/api/books?page=${page}&limit=10`);
      const data = await response.json();
      setBooks(prevBooks => [...prevBooks, ...data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching books:', error);
    }

    setIsLoading(false);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    if (!isLoading) return;

    fetchBooks();
  }, [isLoading]); // Only fetch books when isLoading changes

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="book-list-container" ref={containerRef}>
      <h2>Book List</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published_date}</td>
              <td>
                <Link to={`/book/${book.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div className="loading">Loading...</div>}
      {!isLoading && books.length === 0 && <div className="empty">No books found.</div>}
      {!isLoading && books.length > 0 && (
        <button
          className="load-more-button"
          onClick={() => setIsLoading(true)}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

export default BookList;
