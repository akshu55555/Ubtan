import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Ubtan</div>
      <div className="nav-links">
        <a href="#home" className="nav-item">Home</a>
        <a href="#login" className="nav-item">Login</a>
        <a href="#signup" className="nav-item">Signup</a>
        <a href="#about" className="nav-item">About Us</a>
      </div>
    </nav>
  );
}

export default Navbar;