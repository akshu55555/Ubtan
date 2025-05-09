// frontend/src/components/ShoppingCart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa'; // ✅ Green tick icon
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchCart(token);
    } else {
      setLoading(false);
    }
  }, []);

  // For debugging - log the cart data structure
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Cart data received:", cart);
    }
  }, [cart]);

  const fetchCart = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/getcart', {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000
      });
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
        { quant: newQuantity },
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

  const handleCheckout = () => {
    setShowPaymentSuccess(true);
    
    // Calculate the total amount for display in the popup
    const totalAmount = cart.reduce((sum, item) => 
      sum + ((item.product?.p_price || 0) * (item.quant || 1)), 0);
    
    setPaymentDetails({
      total: totalAmount.toFixed(2)
    });
  };

  const handleClosePopup = async () => {
    const token = localStorage.getItem('token');

    try {
      // ✅ Send cart details to backend before clearing
      const response = await axios.post(
        'http://localhost:5000/payment',
        { },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Store the payment details from backend response
      if (response.data && response.data.payment) {
        setPaymentDetails({
          ...paymentDetails,
          net_price: response.data.payment.net_price
        });
      }
      
      toast.success("Order saved successfully");
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error(error.response?.data?.message || "Failed to save order");
    }

    setShowPaymentSuccess(false);
    setCart([]); // Clear cart after saving
    window.location.href = '/Home';
  };

  if (loading) {
    return <div className="loading-cart">Loading your cart...</div>;
  }

  if (error) {
    return <div className="error-cart">Error loading cart: {error}</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in-cart">
        Please log in to view your cart. <a href="/login">Login</a>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        Your cart is empty. <a href="/products">Browse Products</a>
      </div>
    );
  }

  // Calculate the total for display in the cart
  const cartTotal = cart.reduce((sum, item) => 
    sum + ((item.product?.p_price || 0) * (item.quant || 1)), 0).toFixed(2);

  return (
    <div className="shopping-cart-page">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items-container">
        {cart.map((item) => (
          <div key={item.cart_id} className="cart-item">
            <div className="item-details">
              <div className="item-image-placeholder">Image</div>
              <div className="item-info">
                <p className="item-name">{item.product?.p_name || 'Unknown Product'}</p>
                <p className="item-price">Price: ${item.product?.p_price || 0}</p>
              </div>
            </div>
            <div className="item-quantity">
              <button onClick={() => updateQuantity(item.cart_id, item.quant - 1)}>-</button>
              <span>Qty: {item.quant}</span>
              <button onClick={() => updateQuantity(item.cart_id, item.quant + 1)}>+</button>
            </div>
            <div className="item-actions">
              <p className="item-subtotal">
                Price: ${((item.product?.p_price || 0) * (item.quant || 1)).toFixed(2)}
              </p>
              <button className="remove-button" onClick={() => removeFromCart(item.cart_id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">
          Total: ${cartTotal}
        </p>
        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>

      {/* ✅ Payment Success Popup with Net Purchase */}
      {showPaymentSuccess && (
        <div className="payment-popup-overlay">
          <div className="payment-popup">
            <FaCheckCircle className="payment-success-icon" />
            <h3>Payment Done Successfully</h3>
            <p className="payment-total">Your Net Purchase: ${paymentDetails?.total || cartTotal}</p>
            <button className="done-button" onClick={handleClosePopup}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;