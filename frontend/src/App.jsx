import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import HowToUse from './components/HowToUse.jsx';
import AboutUs from './components/AboutUs.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import ProductSearch from './components/ProductSearch.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import './App.css';

function App() {
  // Define page states
  const PAGES = {
    HOME: 'home',
    SIGNUP: 'signup',
    LOGIN: 'login',
    PRODUCTS: 'products',
    CART: 'cart'
  };
  
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);

  const handleSignupClick = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(PAGES.SIGNUP);
  };

  const handleLoginClick = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(PAGES.LOGIN);
  };

  const handleHomeClick = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(PAGES.HOME);
  };

  const handleBackClick = () => {
    setCurrentPage(PAGES.HOME);
  };

  const navigateToLogin = () => {
    setCurrentPage(PAGES.LOGIN);
  };

  const handleLoginSuccess = () => {
    setCurrentPage(PAGES.PRODUCTS);
  };

  const handleCartClick = () => {
    setCurrentPage(PAGES.CART);
  };

  // Custom Navbar props to handle navigation
  const navbarProps = {
    onSignupClick: handleSignupClick,
    onLoginClick: handleLoginClick,
    onHomeClick: handleHomeClick,
    currentPage: currentPage
  };

  return (
    <div className="app">
      <Navbar {...navbarProps} />
      
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
        <LoginForm 
          onBackClick={handleBackClick}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentPage === PAGES.PRODUCTS && (
        <ProductSearch 
          onCartClick={handleCartClick}
          onHomeClick={handleHomeClick}
        />
      )}

      {currentPage === PAGES.CART && (
        <ShoppingCart />
      )}
    </div>
  );
}

export default App;