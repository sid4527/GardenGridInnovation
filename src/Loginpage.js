import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => { 
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        userId,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
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
    </div>
  );
};

export default LoginPage;
