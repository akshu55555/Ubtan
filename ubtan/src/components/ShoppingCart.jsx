import React, { useState, useEffect } from 'react';
import './ShoppingCart.css';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({ rawData: null, parsedFields: [] });

  useEffect(() => {
    // Fetch cart items when component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    setIsLoading(true);
    // Get the token from localStorage or wherever you store it
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:5000/getcart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Response status:", response.status);
      if (response.ok) {
        return response.json();
      }
      return response.text().then(text => {
        console.log("Error response:", text);
        throw new Error(`Failed to fetch cart items: ${text}`);
      });
    })
    .then(data => {
      console.log("Raw cart data received:", JSON.stringify(data));
      
      // Store raw data for debugging
      setDebug(prevDebug => ({
        ...prevDebug,
        rawData: data
      }));
      
      // Check if data is an array
      if (Array.isArray(data)) {
        // Extract available fields from first item for debugging
        if (data.length > 0) {
          const sampleItem = data[0];
          setDebug(prevDebug => ({
            ...prevDebug,
            parsedFields: Object.keys(sampleItem).map(key => `${key}: ${JSON.stringify(sampleItem[key])}`)
          }));
        }
        
        setCartItems(data);
      } else {
        // If data is not an array, check if it has a specific property that might contain the cart items
        const possibleArrayProps = ['items', 'cartItems', 'products', 'data'];
        for (const prop of possibleArrayProps) {
          if (data && data[prop] && Array.isArray(data[prop])) {
            console.log(`Found cart items in data.${prop}:`, data[prop]);
            setCartItems(data[prop]);
            return;
          }
        }
        
        console.error("Unexpected data format:", data);
        setError("Received data in unexpected format");
      }
      
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching cart:', error);
      setError(error.message);
      setIsLoading(false);
    });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:5000/update-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: itemId,
        quantity: newQuantity
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to update cart');
    })
    .then(() => {
      // Update local state to reflect change
      setCartItems(prevItems => 
        prevItems.map(item => 
          (item.id === itemId || item.prod_id === itemId) ? {...item, quantity: newQuantity} : item
        )
      );
    })
    .catch(error => {
      console.error('Error updating cart:', error);
      alert('Failed to update cart. Please try again.');
    });
  };

  const handleRemoveItem = (itemId) => {
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:5000/remove-from-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: itemId
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to remove item');
    })
    .then(() => {
      // Remove item from local state
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId && item.prod_id !== itemId));
    })
    .catch(error => {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Use net_price instead of price if available
      const price = parseFloat(item.net_price || item.price || item.product_price || 0);
      const quantity = parseInt(item.quantity || item.quant || 1);
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  // Get product name properly
  const getProductName = (item) => {
    // Try to fetch product name from product data or other known fields
    return item.p_name || item.name || item.name || "Unknown Product";
  };

  // Get product ID properly
  const getProductId = (item) => {
    return item.id || item.prod_id || item.product_id || "unknown";
  };

  // Get product price properly
  const getProductPrice = (item) => {
    return item.net_price || item.price || item.product_price || 0;
  };

  // Get product quantity properly
  const getProductQuantity = (item) => {
    return item.quantity || item.quant || 1;
  };

  if (isLoading) return <div className="cart-loading">Loading your cart...</div>;
  if (error) return <div className="cart-error">Error: {error}</div>;

  return (
    <div className="shopping-cart">
      <h1>Your Shopping Cart</h1>
      
      {/* Log Cart Items button */}
      <button 
        onClick={() => console.log("Current cart items:", cartItems)}
        className="log-cart-btn"
      >
        Cart Items
      </button>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div>
          <div className="cart-contents">
            {cartItems.map((item, index) => (
              <div key={getProductId(item) || index} className="cart-item">
                <div className="item-image">
                  <img src={item.imageUrl || item.image_url || '/api/placeholder/100/100'} alt="Product" />
                </div>
                <div className="item-details">
                  <h3>{getProductName(item)}</h3>
                  <p className="item-price">₹{getProductPrice(item)}</p>
                  <small className="debug-info">Item ID: {item.prod_id || item.id || item.cart_id || '35'}</small>
                </div>
                <div className="item-actions">
                  <div className="quantity-control">
                    <select 
                      value={getProductQuantity(item)}
                      onChange={(e) => handleQuantityChange(getProductId(item), parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(getProductId(item))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">₹{calculateTotal()}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;