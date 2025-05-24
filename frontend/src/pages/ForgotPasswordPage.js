import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetEnabled, setIsResetEnabled] = useState(false); // Tracks if the Reset Password button should be enabled
  const navigate = useNavigate(); // Hook for navigation

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }

      setMessage('Password reset email sent successfully!');
      setIsResetEnabled(true); // Enable the Reset Password button
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPasswordRedirect = () => {
    navigate('/reset-password'); // Redirect to ResetPasswordPage
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
        <h2 className="text-center text-primary mb-4">Forgot Password</h2>

        {message && (
          <div className="alert alert-success text-center mb-3" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="btn btn-secondary w-100 fw-semibold"
            onClick={handleResetPasswordRedirect}
            disabled={!isResetEnabled} // Disable the button until the API call is successful
          >
            Reset Password
          </button>
        </div>

        <div className="text-center mt-3">
          <p className="mb-0">
            Remembered your password?{' '}
            <a href="/login" className="text-primary fw-semibold">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}