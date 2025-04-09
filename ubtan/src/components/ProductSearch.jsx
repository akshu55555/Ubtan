import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import './ProductSearch.css'; // Ensure you have this CSS file

function ProductSearch({ onCartClick, onHomeClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([
    { id: 1, name: 'Ubtan Face Pack', description: 'Natural turmeric and gram flour face pack for glowing skin.', price: 299, imageUrl: '/api/placeholder/150/150' },
    { id: 2, name: 'Herbal Hair Oil', description: 'Ayurvedic blend of herbs for strong and shiny hair.', price: 349, imageUrl: '/api/placeholder/150/150' },
    { id: 3, name: 'Ubtan Body Scrub', description: 'Exfoliating body scrub with natural ingredients.', price: 399, imageUrl: '/api/placeholder/150/150' }
  ]);

  const searchInputRef = useRef(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsSuggestionOpen(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_name: query })
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setIsSuggestionOpen(data.length > 0);
      } else {
        console.error('Error fetching suggestions');
        setSuggestions([]);
        setIsSuggestionOpen(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setIsSuggestionOpen(false);
    }
  };

  const debouncedFetchSuggestions = useRef(debounce(fetchSuggestions, 300)).current;

  useEffect(() => {
    debouncedFetchSuggestions(searchTerm);
  }, [searchTerm, debouncedFetchSuggestions]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults([]); // Clear previous search results when typing
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchTerm);
    setIsSuggestionOpen(false); // Close suggestions on submit
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_name: query })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Search response:", data);
        const formattedProduct = { id: data.id || data.prod_id, name: data.item, description: data.description, price: data.price, imageUrl: '/api/placeholder/150/150', dom: data.dom };
        console.log("Formatted product:", formattedProduct);
        setSearchResults([formattedProduct]);
        setSuggestions([]);
        setIsSuggestionOpen(false);
        if (searchInputRef.current) {
          searchInputRef.current.blur();
        }
      } else if (response.status === 402) {
        setSearchResults([]);
        alert('Product not available!!');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
      alert('Product not found or error searching. Please try again.');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    performSearch(suggestion);
    setIsSuggestionOpen(false); // Close suggestions after clicking
  };

  const handleBlur = () => {
    // Delay closing suggestions to allow clicks
    setTimeout(() => {
      setIsSuggestionOpen(false);
    }, 100);
  };

  const handleFocus = () => {
    if (suggestions.length > 0 && searchTerm.trim() !== '') {
      setIsSuggestionOpen(true);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    console.log(`Changed quantity for product ${productId} to ${quantity}`);
  };

  const generateRandomDiscount = () => Math.floor(Math.random() * 16) + 5;
  const formatDate = (date) => date.toISOString().split('T')[0];
  const calculateDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return formatDate(date);
  };

  const handleAddToCart = async (product, quantity) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) { alert("You must be logged in to add items to cart!"); return; }
    const currentDate = formatDate(new Date());
    const deliveryDate = calculateDeliveryDate();
    const discount = generateRandomDiscount();
    const finalPrice = (product.price * quantity * (100 - discount) / 100).toFixed(2);
    const cartData = { prod_id: product.id, quant: quantity, doo: currentDate, dod: deliveryDate, discount: discount, net_price: finalPrice };
    console.log("Sending cart data:", cartData);
    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(cartData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Cart response:", data);
        alert('Product added to cart!');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product to cart. Please try again.');
    }
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
          <p className="product-id">ID: {product.id}</p>
          <p>{product.description}</p>
          <div className="product-price">₹{product.price}</div>
          {product.dom && <div className="product-date">DOM: {product.dom}</div>}
        </div>
        <div className="product-actions">
          <div className="quantity-selector">
            <label htmlFor={`quantity-${product.id}`}>Qty:</label>
            <select id={`quantity-${product.id}`} value={quantity} onChange={(e) => { const newQuantity = parseInt(e.target.value); setQuantity(newQuantity); handleQuantityChange(product.id, newQuantity); }}>
              {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product, quantity)}>Add to Cart</button>
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
              ref={searchInputRef}
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </div>
        </form>
        {isSuggestionOpen && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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

      {searchResults.length === 0 && !isSuggestionOpen && (
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