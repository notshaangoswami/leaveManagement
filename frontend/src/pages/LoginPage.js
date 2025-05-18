import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

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
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        className="card shadow-sm p-4"
        style={{
          width: '400px',
          backgroundColor: 'white',
          borderRadius: '8px',
        }}
      >
        <h2 className="text-center text-primary mb-4">Login</h2>

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
            className="btn btn-primary w-100 fw-semibold"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary fw-semibold">
              Register here
            </Link>
          </p>
          <p className="mt-2">
    <Link to="/forgot-password" className="text-primary fw-semibold">
      Forgot Password?
    </Link>
  </p>
        </div>
      </div>
    </div>
  );
}