import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import bgImage from '../assets/background-login.jpg';
import '../css/LoginPage.css';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // React Router's navigation hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Assumes { token: 'JWT...' }
      onLoginSuccess(data.roles); // Pass roles to App.js
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="card shadow-sm p-4"
        style={{
          width: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Quicksand', 'sans-serif'",
            fontOpticalSizing: 'auto',
            fontWeight: 700,
            fontStyle: 'normal',
            color: '#4D55CC' ,
          }}
        >
          Login
        </h2>


        {error && (
          <div className="alert alert-danger text-center mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold custom-login-btn"
            style={{ backgroundColor: '#4D55CC', borderColor: '#4D55CC', color: 'white' }}
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}