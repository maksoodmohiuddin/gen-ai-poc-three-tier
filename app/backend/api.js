const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express(); // Create an instance of the Express application

app.use(cors()); // Enable CORS

const pool = new Pool({
  user: 'genai',
  host: 'localhost',
  database: 'books',
  password: 'genai',
  port: 5432, // replace with your PostgreSQL port number
}); // Create a PostgreSQL pool for database connections

app.get('/api/books', async (req, res) => {
  const { page, limit } = req.query; // Extract 'page' and 'limit' from query parameters

  try {
    const offset = (page - 1) * limit; // Calculate the offset based on page and limit
    const query = `SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2`; // SQL query to retrieve books with pagination
    const values = [limit, offset]; // Parameter values for the query
    const result = await pool.query(query, values); // Execute the query using the database pool

    res.json(result.rows); // Send the retrieved books as a JSON response
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an appropriate response
  }
});

app.get('/api/books/:id', async (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the request parameters

  try {
    const query = 'SELECT * FROM books WHERE id = $1'; // SQL query to retrieve a specific book by ID
    const result = await pool.query(query, [bookId]); // Execute the query using the database pool

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' }); // Send a 404 response if the book is not found
    } else {
      res.json(result.rows[0]); // Send the retrieved book as a JSON response
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an appropriate response
  }
});

app.use(express.json()); // Add middleware to parse JSON request bodies

app.post('/api/books', async (req, res) => {
  const { title, author, description, published_date } = req.body; // Extract book details from the request body

  try {
    const query = 'INSERT INTO books (title, author, description, published_date) VALUES ($1, $2, $3, $4)'; // SQL query to insert a new book
    await pool.query(query, [title, author, description, published_date]); // Execute the query using the database pool

    res.sendStatus(201); // Send a 201 response (Created) to indicate successful creation
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an appropriate response
  }
});

app.put('/api/books/:id', async (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the request parameters
  const { title, author, description, published_date } = req.body; // Extract updated book details from the request body

  try {
    const query = 'UPDATE books SET title = $1, author = $2, description = $3, published_date = $4 WHERE id = $5'; // SQL query to update a specific book by ID
    await pool.query(query, [title, author, description, published_date, bookId]); // Execute the query using the database pool

    res.sendStatus(200); // Send a 200 response (OK) to indicate successful update
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an appropriate response
  }
});

app.delete('/api/books/:id', async (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the request parameters

  try {
    const query = 'DELETE FROM books WHERE id = $1'; // SQL query to delete a book by ID
    await pool.query(query, [bookId]); // Execute the query using the database pool

    res.sendStatus(204); // Send a 204 response (No Content) to indicate successful deletion
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an appropriate response
  }
});

const port = 3001; // replace with your desired port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`); // Start the server and log the port number
});
