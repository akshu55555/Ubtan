import React from 'react';
import './SignupForm.css'; // Reusing the same styles

function LoginForm({ onBackClick, onLoginSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      id: e.target.id.value,
      first_name: e.target.first_name.value
    };
    
    fetch('http://localhost:5000/login', {
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
      // ✅ Store token in localStorage
      localStorage.setItem('token', data.token);

      alert('Login successful!');
      e.target.reset();
      // Call the onLoginSuccess function to navigate to the products page
      onLoginSuccess();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was a problem with your login. Please try again.');
    });
  };

  return (
    <div className="signup-form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" placeholder="Enter your ID" required />
        </div>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" id="first_name" name="first_name" placeholder="Enter your name" required />
        </div>
        <div className="form-buttons">
          <button type="button" className="back-btn" onClick={onBackClick}>Back</button>
          <button type="submit" className="submit-btn">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
