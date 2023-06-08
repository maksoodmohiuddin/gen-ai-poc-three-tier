import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  useEffect(() => {
    // Fetch book details when the component mounts
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/books/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setAuthor(data.author);
      setDescription(data.description);
      // setPublishedDate(data.published_date);
      const formattedDate = new Date(data.published_date).toISOString().substring(0, 10);
      setPublishedDate(formattedDate);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      description,
      published_date: publishedDate,
    };

    try {
      const response = await fetch(`http://localhost:3001/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        console.log('Book updated successfully');
        alert('Book updated successfully');
        // Handle success, such as showing a success message or redirecting
      } else {
        console.error('Failed to update book');
        alert('Failed to update book');
        // Handle error, such as showing an error message
      }
    } catch (error) {
      alert('Error updating book:', error);
      console.error('Error updating book:', error);
      // Handle error, such as showing an error message
    }
  };

  return (
    <div>
      {/* Display the book details */}
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Book Details</h2>
      <p>Book ID: {id}</p>
      {/* Form for updating book details */}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title" style={{ fontWeight: 'bold' }}>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="author" style={{ fontWeight: 'bold' }}>Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="description" style={{ fontWeight: 'bold' }}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="publishedDate" style={{ fontWeight: 'bold' }}>Published Date:</label>
          <input
            type="date"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Update</button>
      </form>
    </div>
  );
}

export default BookDetails;
