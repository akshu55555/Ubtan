import React, { useState } from "react";

const AddRawMaterialForm = ({ closeModal }) => {
  const [material, setMaterial] = useState({
    m_name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/raw_material", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(material)
    });

    if (response.ok) {
      alert("Raw material added successfully!");
      closeModal();  // Close the modal after successful submission
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Error adding raw material.");
    }
  };

  return (
    <div className="add-raw-material-form-container">
      <h2>Add Raw Material</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="m_name">Material Name:</label>
          <input
            type="text"
            id="m_name"
            name="m_name"
            value={material.m_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Material</button>
      </form>
    </div>
  );
};

export default AddRawMaterialForm;
