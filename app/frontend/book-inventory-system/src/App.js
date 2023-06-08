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
        <Navigation />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
