import React, { useState } from 'react';
import './AddBookForm.css';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // Handle form submission and add book to the inventory
    // You can implement the logic to add a book, either by updating state or making an API call

    // Clear form fields after submission
    setTitle('');
    setAuthor('');
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddBookForm;
