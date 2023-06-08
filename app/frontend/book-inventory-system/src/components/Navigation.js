import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import BrandLogo from './brandLogo.svg';

function Navigation() {
  return (
    <nav className="navigation">
      <img className="logo" src={BrandLogo} alt="Brand Logo" />
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/add" className="nav-link">Add Book</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
