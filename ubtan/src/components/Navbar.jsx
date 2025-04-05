import React from 'react';
import './Navbar.css';

function Navbar({ onSignupClick, onLoginClick }) {
  return (
    <nav className="navbar">
      <div className="logo">Ubtan</div>
      <div className="nav-links">
        <a href="#home" className="nav-item">Home</a>
        <a href="#login" className="nav-item" onClick={onLoginClick}>Login</a>
        <a href="#signup" className="nav-item" onClick={onSignupClick}>Signup</a>
        <a href="#about" className="nav-item">About Us</a>
      </div>
    </nav>
  );
}

export default Navbar;