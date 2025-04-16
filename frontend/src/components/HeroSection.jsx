import React, { useEffect } from 'react';
import './HeroSection.css';
import useScrollAnimation from '../hooks/useScrollAnimation';

function HeroSection() {
  useScrollAnimation();
  
  return (
    <div className="hero-section" id="home">
      <div className="hero-overlay">
        <h1 className="main-heading fade-in">Ubtan</h1>
        <h2 className="tagline fade-in">Feel the radiance</h2>
      </div>
    </div>
  );
}

export default HeroSection;