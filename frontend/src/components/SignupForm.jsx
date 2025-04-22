import React, { useState } from 'react';
import './SignupForm.css';

function SignupForm({ onBackClick, navigateToLogin }) {
  const [userType, setUserType] = useState('customer'); // Default to customer

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      contact: e.target.contact.value,
      address: e.target.address.value,
      usertype: userType,  // Add user type to the data
    };

    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      // Just show the message from backend in the alert which contains the ID
      alert(data.message);
      e.target.reset();
      navigateToLogin();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was a problem with your submission. Please try again.');
    });
  };

  return (
    <div className="signup-form-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required />
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact">Contact</label>
          <input type="tel" id="contact" name="contact" placeholder="Enter your phone number" required />
        </div>
        <div className="form-field">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" placeholder="Enter your address" required />
        </div>
        <div className="form-field">
          <label htmlFor="userType">User Type</label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-buttons">
          <button type="button" className="back-btn" onClick={onBackClick}>Back</button>
          <button type="submit" className="submit-btn">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;