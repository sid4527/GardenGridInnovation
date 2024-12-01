import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Correct the API endpoint to match the backend route
      const response = await axios.post('http://localhost:9000/api/users', { userId, password, email });
      setMessage(response.data.message || 'Sign-up successful!');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Navigate to the login page
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Sign-up failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("/path-to-your-background-image.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          width: '300px',
        }}
      >
        <h2 style={{ color: 'green', marginBottom: '20px' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '10px 0' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>User Id:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{
                padding: '5px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              required
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '5px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              required
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '5px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
        </form>
        {message && (
          <p style={{ marginTop: '15px', color: message.includes('successful') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
