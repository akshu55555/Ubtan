import React from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import HowToUse from './components/HowToUse.jsx';
import AboutUs from './components/AboutUs.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      
      <HowToUse />
      <AboutUs />
    </div>
  );
}

export default App;