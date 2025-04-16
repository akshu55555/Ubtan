import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import './ProductSearch.css'; // Ensure you have this CSS file

// Import your static images - adjust paths as needed
import ubtanFacePackImg from '../assets/ubtan.jpg'; // Adjust path if needed
// Import other product images as needed

function ProductSearch({ onCartClick, onHomeClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Image mapping function - maps backend paths to imported images
  const getImageForProduct = (product) => {
    // This is a simple mapping - you might need to adjust based on your specific needs
    if (product.image && product.image.includes('ubtan.jpg')) {
      return ubtanFacePackImg;
    }
    // Add more mappings as needed

    // Default placeholder if no matching image
    return '/api/placeholder/150/150';
  };

  // Fetch featured products when component mounts
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch('http://localhost:5000/featured-products', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      if (response.ok) {
        const data = await response.json();
        setFeaturedProducts(data);
      } else {
        console.error('Error fetching featured products');
        // Fallback to default products if API fails
        setFeaturedProducts([
          { id: 1, name: 'Ubtan Face Pack', description: 'Natural turmeric and gram flour face pack for glowing skin.', price: 299, dom: '2025-04-16' },
          { id: 2, name: 'Herbal Hair Oil', description: 'Ayurvedic blend of herbs for strong and shiny hair.', price: 349, dom: '2025-06-16' },
          { id: 3, name: 'Ubtan Oil Scrub', description: 'Exfoliating body scrub with natural ingredients.', price: 399, dom: '2025-05-12' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Fallback to default products if API fails
      setFeaturedProducts([
        { id: 1, name: 'Ubtan Face Pack', description: 'Natural turmeric and gram flour face pack for glowing skin.', price: 299, dom: '2025-04-16' },
        { id: 2, name: 'Herbal Hair Oil', description: 'Ayurvedic blend of herbs for strong and shiny hair.', price: 349, dom: '2025-06-16' },
        { id: 3, name: 'Ubtan Oil Scrub', description: 'Exfoliating body scrub with natural ingredients.', price: 399, dom: '2025-05-12' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // performSearch is already called on searchTerm change
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
        // Ensure data is always an array for mapping
        const resultsArray = Array.isArray(data) ? data : (data ? [data] : []);
        const formattedResults = resultsArray.map(item => ({
          id: item.id || item.prod_id,
          name: item.item || item.p_name,
          description: item.description,
          price: item.price||  item.p_price,
          image: item.image || '/frontend/src/assets/ubtan.jpg',
          dom: item.dom
        }));
        setSearchResults(formattedResults);
      } else if (response.status === 404) {
        setSearchResults([]);
        // Optionally display a "No products found" message
      } else if (response.status === 402) {
        setSearchResults([]);
        alert('Product not available!!');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
      // Optionally display an error message
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
    if (!token) {
      alert("You must be logged in to add items to cart!");
      return;
    }

    const currentDate = formatDate(new Date());
    const deliveryDate = calculateDeliveryDate();
    const discount = generateRandomDiscount();
    const finalPrice = (product.price * quantity * (100 - discount) / 100).toFixed(2);

    const cartData = {
      prod_id: product.id,
      quant: quantity,
      doo: currentDate,
      dod: deliveryDate,
      discount: discount,
      net_price: finalPrice
    };

    console.log("Sending cart data:", cartData);

    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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

  const handleProductClick = (productId) => {
    // performSearch is already triggered by searchTerm change
  };

  const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="product-card">
        <div className="product-image" onClick={() => handleProductClick(product.id)}>
          <img src={getImageForProduct(product)} alt={product.name} />
        </div>
        <div className="product-details" onClick={() => handleProductClick(product.id)}>
          <h3>{product.name}</h3>
          <p className="product-id">ID: {product.id}</p>
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
              onChange={handleInputChange}
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

      {searchResults.length === 0 && searchTerm.trim() === '' && (
        <div className="featured-products">
          <h2>Featured Products</h2>
          {isLoading ? (
            <div className="loading">Loading featured products...</div>
          ) : (
            <div className="products-container">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {searchResults.length === 0 && searchTerm.trim() !== '' && !isLoading && (
        <div className="no-results">
          <p>No products found matching "{searchTerm}"</p>
        </div>
      )}

      <button className="cart-button" onClick={onCartClick}>
        <ShoppingCart size={24} color="black" />
      </button>
    </div>
  );
}

export default ProductSearch;