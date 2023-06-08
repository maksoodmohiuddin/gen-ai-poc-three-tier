// AddBookForm.jsx

import React, { useState } from 'react';
import './AddBookForm.css';

function AddBookForm() {
  const [title, setTitle] = useState(''); // State for storing the book title
  const [author, setAuthor] = useState(''); // State for storing the author name
  const [description, setDescription] = useState(''); // State for storing the book description
  const [publishedDate, setPublishedDate] = useState(''); // State for storing the published date

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      description,
      published_date: publishedDate
    };

    try {
      const response = await fetch('http://localhost:3001/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      });

      if (response.ok) {
        console.log('New book created successfully');
        alert('New book created successfully!');
        // Clear form fields after successful creation
        setTitle('');
        setAuthor('');
        setDescription('');
        setPublishedDate('');
      } else {
        alert('Failed to create new book');
        console.error('Failed to create new book');
      }
    } catch (error) {
      console.error('Error creating new book:', error);
      alert('Error creating new book:', error);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter the author's name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="publishedDate">Published Date:</label>
          <input
            type="date"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            placeholder="Enter the published date"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add</button>
      </form>
    </div>
  );
}

export default AddBookForm;
