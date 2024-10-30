import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User ID:', userId, 'Password:', password);
    // Handle authentication logic here
  };

  const handleGoHome = () => {
    navigate('/home'); // Redirect to home page
  };

  return (
    <div className="login-container">
      <h2>Garden Inventory App</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userId">User Id:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoHome}>Go to Home</button> {/* New Home button */}
    </div>
  );
};

export default Login;
