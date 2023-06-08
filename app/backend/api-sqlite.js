
// const db = new sqlite3.Database('/Users/Maksood_Mohiuddin/Documents/Training/GenAI/code/mini-project/gen-ai-poc-three-tier/app/database/books.db');
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;
const db = new sqlite3.Database('/Users/Maksood_Mohiuddin/Documents/Training/GenAI/code/mini-project/gen-ai-poc-three-tier/app/database/books.db');

// Enable CORS
app.use(cors());

// Set security-related HTTP headers
app.use(helmet());

// Middleware to parse JSON request bodies
app.use(express.json());

// GET route to fetch all books
app.get('/api/books', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// GET route to fetch a single book
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM books WHERE id = ?';
  const values = [id];

  db.get(query, values, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!row) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(row);
    }
  });
});


// POST route to add a new book
app.post('/api/books', (req, res) => {
  const { title, author, description, published_date } = req.body;

  const query = `INSERT INTO books (title, author, description, published_date) VALUES (?, ?, ?, ?)`;
  const values = [title, author, description, published_date];

  db.run(query, values, function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// PUT route to update a book
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, description, published_date } = req.body;

  const query = `UPDATE books SET title = ?, author = ?, description = ?, published_date = ? WHERE id = ?`;
  const values = [title, author, description, published_date, id];

  db.run(query, values, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json({ message: 'Book updated successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
