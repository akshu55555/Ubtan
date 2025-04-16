import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchCart(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCart = async (token) => {
    setLoading(true);
    setError(null);
    try {
      // Updated URL to match your backend routing - using port 5000 instead of 3000
      // and /getcart instead of /cart/getcart
      const response = await axios.get('http://localhost:5000/getcart', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 10000 // 10 second timeout
      });
      
      console.log("Cart response received:", response.data);
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      
      // Handle specific error types
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        
        if (error.response.status === 401 || error.response.status === 402) {
          // Token issues
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setError("Session expired. Please login again.");
        } else {
          setError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
        setError("Network error. Please check your connection and try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Request error: ${error.message}`);
      }
      
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const token = localStorage.getItem('token');
      // Also update these URLs to use port 5000
      await axios.delete(`http://localhost:5000/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update cart state after successful removal
      setCart(cart.filter(item => item.id !== id));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const token = localStorage.getItem('token');
      // Also update these URLs to use port 5000
      await axios.put(`http://localhost:5000/cart/update/${id}`, 
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update cart state after successful update
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          <p>Loading cart items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) fetchCart(token);
            }}
            className="mt-2 px-4 py-2 bg-yellow-800 text-white rounded hover:bg-yellow-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          <p>Please log in to view your cart.</p>
          <Link to="/login" className="text-blue-500 hover:underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          <p>Your cart is empty.</p>
          <Link to="/products" className="text-blue-500 hover:underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div className="flex-1">
                <p className="font-medium">{item.Product ? item.Product.name : 'Unknown Product'}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              
              <div className="ml-4">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-right">
          <p className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Link to="/products" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
          <Link 
            to="/checkout" 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;