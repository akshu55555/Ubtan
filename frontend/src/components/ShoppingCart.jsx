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
      const response = await axios.get('http://localhost:5000/getcart', {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000
      });
      
      console.log("Full cart response:", response.data); // Debug the structure
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError(error.response?.data?.message || "Failed to load cart");
      setLoading(false);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/cart/remove/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart(cart.filter(item => item.cart_id !== cartId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/cart/update/${cartId}`,
        { quant: newQuantity }, // Match backend expected field name
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCart(cart.map(item => 
        item.cart_id === cartId ? { ...item, quant: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  // ... rest of your component code ...

  return (
    <div className="container mx-auto p-4">
      {/* ... other JSX ... */}
      {cart.map((item) => (
        <div key={item.cart_id || item.id} className="flex justify-between items-center border-b pb-4">
          <div className="flex-1">
            <p className="font-medium">{item.Product?.p_name || item.p_name || 'Unknown Product'}</p>
            <p className="text-gray-600">Price: ${item.price || item.net_price}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={() => updateQuantity(item.cart_id || item.id, (item.quant || item.quantity) - 1)}>
              -
            </button>
            <span>{item.quant || item.quantity}</span>
            <button onClick={() => updateQuantity(item.cart_id || item.id, (item.quant || item.quantity) + 1)}>
              +
            </button>
          </div>
          
          {/* ... rest of item display ... */}
        </div>
      ))}
      {/* ... other JSX ... */}
    </div>
  );
};

export default ShoppingCart;