// frontend/src/components/AdminProductView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProductView.css';

const AdminProductView = ({ goToPage, PAGES }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/viewproduct');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="admin-product-view">
      <h2>All Products</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.prod_id}>
              <div className="product-image">Image</div>
              <h3>{product.p_name}</h3>
              <p><strong>Price:</strong> ${product.p_price}</p>
              <p><strong>Manufactured:</strong> {new Date(product.dom).toLocaleDateString()}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="back-button-container">
        <button className="back-button" onClick={() => goToPage(PAGES.ADMIN)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminProductView;
