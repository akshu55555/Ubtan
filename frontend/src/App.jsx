import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import HowToUse from './components/HowToUse.jsx';
import AboutUs from './components/AboutUs.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import ProductSearch from './components/ProductSearch.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminProductView from './components/AdminProductView.jsx';
import AdminRawMaterialView from './components/AdminRawMaterialView.jsx'; 
import AdminSupplierView from './components/AdminSupplierView.jsx';
import './App.css';

function App() {
  const PAGES = {
    HOME: 'home',
    SIGNUP: 'signup',
    LOGIN: 'login',
    PRODUCTS: 'products',
    CART: 'cart',
    ADMIN: 'admin',
    ADMIN_PRODUCTS: 'admin-products',
    ADMIN_RAW_MATERIALS: 'admin-raw-materials',
    ADMIN_SUPPLIERS: 'admin-suppliers'  
  };
  const [currentPage, setCurrentPage] = useState(PAGES.CART); 
  //const [currentPage, setCurrentPage] = useState(PAGES.ADMIN);
  const [userType, setUserType] = useState(null); // 'admin' or 'customer'

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

  const handleLoginSuccess = (userRole) => {
    setUserType(userRole); // 'admin' or 'customer'
    if (userRole === 'admin') {
      setCurrentPage(PAGES.ADMIN);
    } else {
      setCurrentPage(PAGES.PRODUCTS);
    }
  };

  const handleCartClick = () => {
    setCurrentPage(PAGES.CART);
  };

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

     

      {currentPage === PAGES.ADMIN && (
        <AdminDashboard 
          goToPage={setCurrentPage} 
          PAGES={PAGES} 
        />
      )}
      {currentPage === PAGES.CART && (
      <ShoppingCart goToHomePage={() => setCurrentPage(PAGES.HOME)} />
      )}
      {currentPage === PAGES.ADMIN_PRODUCTS && (
      <AdminProductView goToPage={setCurrentPage} PAGES={PAGES} />
      )}
      {currentPage === PAGES.ADMIN_RAW_MATERIALS && (
      <AdminRawMaterialView goToPage={setCurrentPage} PAGES={PAGES} />
      )}
      {currentPage === PAGES.ADMIN_SUPPLIERS && (  // Added this route for Suppliers
      <AdminSupplierView goToPage={setCurrentPage} PAGES={PAGES} />
      )}


    </div>
  );
}

export default App;
