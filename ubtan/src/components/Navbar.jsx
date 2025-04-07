import React from 'react';
import './Navbar.css';

function Navbar({ onSignupClick, onLoginClick, onHomeClick, currentPage }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>Ubtan</div>
      <div className="nav-links">
        <a 
          href="#home" 
          className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={onHomeClick}
        >
          Home
        </a>
        <a 
          href="#login" 
          className={`nav-item ${currentPage === 'login' ? 'active' : ''}`}
          onClick={onLoginClick}
        >
          Login
        </a>
        <a 
          href="#signup" 
          className={`nav-item ${currentPage === 'signup' ? 'active' : ''}`}
          onClick={onSignupClick}
        >
          Signup
        </a>
        <a href="#about" className="nav-item">About Us</a>
      </div>
    </nav>
  );
}

export default Navbar;