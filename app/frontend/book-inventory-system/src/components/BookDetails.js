import React from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();

  // Get book details based on ID
  // You can fetch book data from an API or use a state management solution like Redux

  return (
    <div>
      <h2>Book Details</h2>
      <p>Book ID: {id}</p>
      <p>Title: Book {id}</p>
      <p>Author: Author {id}</p>
    </div>
  );
}

export default BookDetails;
