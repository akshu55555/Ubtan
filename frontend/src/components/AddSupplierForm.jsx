import React, { useState } from "react";

const AddSupplierForm = ({ closeModal }) => {
  const [supplier, setSupplier] = useState({
    s_name: "",
    location: "",
    s_contact: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/supplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(supplier)
    });

    if (response.ok) {
      alert("Supplier added successfully!");
      closeModal();  // Close the modal after successful submission
    } else {
      alert("Error adding supplier.");
    }
  };

  return (
    <div className="add-supplier-form-container">
      <h2>Add New Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="s_name">Supplier Name:</label>
          <input
            type="text"
            id="s_name"
            name="s_name"
            value={supplier.s_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={supplier.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="s_contact">Supplier Contact:</label>
          <input
            type="text"
            id="s_contact"
            name="s_contact"
            value={supplier.s_contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplierForm;
