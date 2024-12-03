import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page reload
    console.log('Register button is triggered');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      if (response.status === 200) {
        setMessage('Registered Successfully');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Error in registration');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setMessage('');
            }}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage('');
            }}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate('/')}>
            Go to Login
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
