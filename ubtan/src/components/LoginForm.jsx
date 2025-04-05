import React from 'react';
import './SignupForm.css'; // Reusing the same styles

function LoginForm({ onBackClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      id: e.target.id.value,
      name: e.target.name.value
    };

    fetch('http://localhost:5003/login', {
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
      alert('Login successful!');
      e.target.reset();
      onBackClick();
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
          <input type="text" id="name" name="name" placeholder="Enter your name" required />
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