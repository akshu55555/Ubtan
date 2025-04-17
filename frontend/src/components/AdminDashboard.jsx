import React, { useState } from "react";
import './AdminDashboard.css';
import AddSupplierForm from './AddSupplierForm';
import AddRawMaterialForm from './AddRawMaterialForm';
import AddProductForm from './AddProductForm';  // ADD this import

const AdminDashboard = ({ goToPage, PAGES }) => {
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isRawMaterialModalOpen, setIsRawMaterialModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);  // ADD this state

  const handleAddSupplierClick = () => {
    setIsSupplierModalOpen(true);
  };

  const handleAddRawMaterialClick = () => {
    setIsRawMaterialModalOpen(true);
  };

  const handleAddProductClick = () => {  // ADD this function
    setIsProductModalOpen(true);
  };

  const closeSupplierModal = () => {
    setIsSupplierModalOpen(false);
  };

  const closeRawMaterialModal = () => {
    setIsRawMaterialModalOpen(false);
  };

  const closeProductModal = () => {  // ADD this function
    setIsProductModalOpen(false);
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <h2>What would you like to do?</h2>
        <div className="admin-dashboard-buttons">
          <button onClick={() => goToPage(PAGES.PRODUCTS)}>View Products</button>
          <button onClick={() => alert("View Raw Materials page not implemented")}>View Raw Materials</button>
          <button onClick={() => alert("View Suppliers page not implemented")}>View Suppliers</button>
          <button onClick={handleAddSupplierClick}>Add New Supplier</button>
          <button onClick={handleAddProductClick}>Add New Product</button> {/* Update this button */}
          <button onClick={handleAddRawMaterialClick}>Add New Raw Material</button>
        </div>
      </div>

      {/* Modal for Add Supplier */}
      {isSupplierModalOpen && (
        <div className="modal-overlay" onClick={closeSupplierModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeSupplierModal}>X</button>
            <AddSupplierForm closeModal={closeSupplierModal} />
          </div>
        </div>
      )}

      {/* Modal for Add Raw Material */}
      {isRawMaterialModalOpen && (
        <div className="modal-overlay" onClick={closeRawMaterialModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeRawMaterialModal}>X</button>
            <AddRawMaterialForm closeModal={closeRawMaterialModal} />
          </div>
        </div>
      )}

      {/* Modal for Add Product */}
      {isProductModalOpen && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeProductModal}>X</button>
            <AddProductForm closeModal={closeProductModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
