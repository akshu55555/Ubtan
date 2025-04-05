import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import HowToUse from './components/HowToUse.jsx';
import AboutUs from './components/AboutUs.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import './App.css';

function App() {
  // Define page states
  const PAGES = {
    HOME: 'home',
    SIGNUP: 'signup',
    LOGIN: 'login'
  };
  
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);

  const handleSignupClick = (e) => {
    e.preventDefault();
    setCurrentPage(PAGES.SIGNUP);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setCurrentPage(PAGES.LOGIN);
  };

  const handleBackClick = () => {
    setCurrentPage(PAGES.HOME);
  };

  const navigateToLogin = () => {
    setCurrentPage(PAGES.LOGIN);
  };

  return (
    <div className="app">
      <Navbar 
        onSignupClick={handleSignupClick}
        onLoginClick={handleLoginClick}
      />
      
      {currentPage === PAGES.HOME && (
        <>
          <HeroSection />
          <HowToUse />
          <AboutUs />
        </>
      )}

      {currentPage === PAGES.SIGNUP && (
        <SignupForm 
          onBackClick={handleBackClick} 
          navigateToLogin={navigateToLogin} 
        />
      )}

      {currentPage === PAGES.LOGIN && (
        <LoginForm onBackClick={handleBackClick} />
      )}
    </div>
  );
}

export default App;