import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios for API calls
import './Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the environment variable for the backend API URL
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL || 'http://3.21.98.193:9000'}/api/login`, { userId, password });
      setMessage(response.data.message || 'Login successful!');
      
      // Redirect to home page upon successful login
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to signup page
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
        {message && (
          <p style={{ marginTop: '10px', color: message.includes('successful') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
        <button onClick={handleSignUp} className="home-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
