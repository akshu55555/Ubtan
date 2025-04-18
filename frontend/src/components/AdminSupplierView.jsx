import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminSupplierView.css'; // Create this CSS or copy styling from AdminProductView

const AdminSupplierView = ({ goToPage, PAGES }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/viewsupplier');
      setSuppliers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setLoading(false);
    }
  };

  return (
    <div className="admin-supplier-view">
      <h2>All Suppliers</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="supplier-grid">
          {suppliers.map(supplier => (
            <div className="supplier-card" key={supplier.supplier_id}>
              <h3>{supplier.s_name}</h3>
              <p><strong>Location:</strong> {supplier.location}</p>
              <p><strong>Contact:</strong> {supplier.s_contact}</p>
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

export default AdminSupplierView;
