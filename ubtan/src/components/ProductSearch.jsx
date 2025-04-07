import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import './ProductSearch.css';

function ProductSearch({ onCartClick, onHomeClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: 'Ubtan Face Pack',
      description: 'Natural turmeric and gram flour face pack for glowing skin.',
      price: 299,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 2,
      name: 'Herbal Hair Oil',
      description: 'Ayurvedic blend of herbs for strong and shiny hair.',
      price: 349,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 3,
      name: 'Ubtan Body Scrub',
      description: 'Exfoliating body scrub with natural ingredients.',
      price: 399,
      imageUrl: '/api/placeholder/150/150'
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      // Clear search results if search term is empty
      setSearchResults([]);
      return;
    }
    
    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p_name: searchTerm })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      console.log("Search response:", data); // Debug log to see the actual response
      
      // Transform the received data into the expected format
      const formattedProduct = {
        id: data.id || data.prod_id, // Try both possible ID field names
        name: data.item,
        description: data.description,
        price: data.price,
        imageUrl: '/api/placeholder/150/150', // Default placeholder
        dom: data.dom
      };
      
      console.log("Formatted product:", formattedProduct); // Debug log
      
      // Set search results as an array with the found product
      setSearchResults([formattedProduct]);
    })
    .catch(error => {
      console.error('Error:', error);
      setSearchResults([]); // Clear results in case of error
      alert('Product not found or error searching. Please try again.');
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    console.log(`Changed quantity for product ${productId} to ${quantity}`);
  };

  // Helper function to generate random discount (5-20%)
  const generateRandomDiscount = () => {
    return Math.floor(Math.random() * 16) + 5; // Random number between 5 and 20
  };
  
  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Helper function to calculate delivery date (current date + 5 days)
  const calculateDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return formatDate(date);
  };

  const handleAddToCart = (product, quantity) => {
    // Get token from localStorage (assuming your login process stores it there)
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      alert("You must be logged in to add items to cart!");
      return;
    }
    
    // Get the current date for order date
    const currentDate = formatDate(new Date());
    
    // Calculate delivery date (current date + 5 days)
    const deliveryDate = calculateDeliveryDate();
    
    // Generate random discount between 5% and 20%
    const discount = generateRandomDiscount();
    
    // Calculate final price after discount
    const finalPrice = (product.price * quantity * (100 - discount) / 100).toFixed(2);
    
    const cartData = {
      prod_id: product.id,
      quant: quantity,
      doo: currentDate,        // Date of Order
      dod: deliveryDate,       // Date of Delivery
      discount: discount,      // Random discount percentage
      net_price: finalPrice    // Important: changed from 'price' to 'net_price' to match your backend
    };
    
    console.log("Sending cart data:", cartData);
    
    fetch('http://localhost:5000/cart', {  // Updated endpoint to '/cart'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Send the JWT token
      },
      body: JSON.stringify(cartData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      console.log("Cart response:", data);
      alert('Product added to cart!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error adding product to cart. Please try again.');
    });
  };

  const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    
    return (
      <div className="product-card">
        <div className="product-image">
          <img src={product.imageUrl || '/api/placeholder/150/150'} alt={product.name} />
        </div>
        <div className="product-details">
          <h3>{product.name}</h3>
          <p className="product-id">ID: {product.id}</p> {/* Display product ID */}
          <p>{product.description}</p>
          <div className="product-price">₹{product.price}</div>
          {product.dom && <div className="product-date">DOM: {product.dom}</div>}
        </div>
        <div className="product-actions">
          <div className="quantity-selector">
            <label htmlFor={`quantity-${product.id}`}>Qty:</label>
            <select 
              id={`quantity-${product.id}`}
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                setQuantity(newQuantity);
                handleQuantityChange(product.id, newQuantity);
              }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button 
            className="add-to-cart-btn" 
            onClick={() => handleAddToCart(product, quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="product-search-page">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="products-container">
            {searchResults.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && (
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="products-container">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <button className="cart-button" onClick={onCartClick}>
        <ShoppingCart size={24} color="black" />
      </button>
    </div>
  );
}

export default ProductSearch;