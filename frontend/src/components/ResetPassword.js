import React, { useState } from 'react';

export default function ResetPasswordPage() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setMessage('Password reset successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
        <h2 className="text-center text-primary mb-4">Reset Password</h2>

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

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="token" className="form-label fw-semibold">
              Token
            </label>
            <input
              type="text"
              id="token"
              className="form-control"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter the reset token"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label fw-semibold">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

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