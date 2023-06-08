const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Create an instance of the Express application
const app = express();

// Enable CORS
app.use(cors());

// Create a PostgreSQL pool for database connections
const pool = new Pool({
  user: 'genai',
  host: 'localhost',
  database: 'books',
  password: 'genai',
  port: 5432, // replace with your PostgreSQL port number
});

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const query = 'SELECT * FROM books';
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a specific book by ID
app.get('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await pool.query(query, [bookId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Add middleware to parse JSON request bodies
app.use(express.json());

// POST a new book
app.post('/api/books', async (req, res) => {
  const { title, author, description, published_date } = req.body;

  try {
    const query = 'INSERT INTO books (title, author, description, published_date) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [title, author, description, published_date]);

    res.sendStatus(201); // Created
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a specific book by ID
app.put('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, description, published_date } = req.body;

  try {
    const query = 'UPDATE books SET title = $1, author = $2, description = $3, published_date = $4 WHERE id = $5';
    await pool.query(query, [title, author, description, published_date, bookId]);

    res.sendStatus(200); // OK
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DELETE a book by ID
app.delete('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const query = 'DELETE FROM books WHERE id = $1';
    await pool.query(query, [bookId]);

    res.sendStatus(204); // No Content
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3001; // replace with your desired port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
