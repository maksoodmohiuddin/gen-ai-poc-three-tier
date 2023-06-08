import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBookForm from './components/AddBookForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Render the Navigation component */}
        <Navigation />
        <Routes>
          {/* Define a route for the BookList component */}
          <Route path="/" element={<BookList />} />
          {/* Define a route for the BookDetails component with a dynamic ID parameter */}
          <Route path="/book/:id" element={<BookDetails />} />
          {/* Define a route for the AddBookForm component */}
          <Route path="/add" element={<AddBookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
