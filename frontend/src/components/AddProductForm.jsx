import React, { useState } from 'react';

const AddProductForm = ({ closeModal }) => {
  const [product, setProduct] = useState({
    prod_id: '',
    p_name: '',
    p_price: '',
    dom: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/addproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      alert('Product added successfully!');
      closeModal();
    } else {
      const err = await response.json();
      alert(err.message || 'Failed to add product.');
    }
  };

  return (
    <div className="add-product-form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="number"
            name="prod_id"
            value={product.prod_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="p_name"
            value={product.p_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="p_price"
            value={product.p_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Manufacture:</label>
          <input
            type="date"
            name="dom"
            value={product.dom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
