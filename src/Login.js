import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User ID:', userId, 'Password:', password);
    // Handle authentication logic here
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
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
          <button type="submit" className="login-button">Login</button>
        </form>
        <button onClick={handleGoHome} className="home-button">Go to Home</button>
        <button onClick={handleSignUp} className="home-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
