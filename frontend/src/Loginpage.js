import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { userId, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: 'green' }}>Garden Inventory App</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px' }}>
          <label>User Id: </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <button type="submit" style={{ padding: '5px 20px' }}>
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleSignupRedirect}
          style={{
            padding: '5px 20px',
            backgroundColor: 'lightgray',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', { userId, password, email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Sign-up failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: 'green' }}>Sign Up - Garden Inventory App</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px' }}>
          <label>User Id: </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <button type="submit" style={{ padding: '5px 20px' }}>Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <LoginPage />
      <SignupPage />
    </div>
  );
};

export default LoginPage;
