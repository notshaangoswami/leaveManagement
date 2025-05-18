import React, { useState } from 'react';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    roles: [],
    department: '',
    managerId: '',
    joiningDate: '',
    phone: '',
    emergencyContact: '',
    isActive: true,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setMessage('Registration successful!');
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
          width: '500px',
          backgroundColor: 'white',
          borderRadius: '8px',
        }}
      >
        <h2 className="text-center text-primary mb-4">Register</h2>

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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fullName" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Roles</label>
            <div>
              {['ADMIN', 'EMPLOYEE', 'MANAGER'].map((role) => (
                <div key={role} className="form-check">
                  <input
                    type="checkbox"
                    id={role}
                    className="form-check-input"
                    checked={formData.roles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                  <label htmlFor={role} className="form-check-label">
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="department" className="form-label fw-semibold">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="managerId" className="form-label fw-semibold">
              Manager ID
            </label>
            <input
              type="text"
              id="managerId"
              name="managerId"
              className="form-control"
              value={formData.managerId}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="joiningDate" className="form-label fw-semibold">
              Joining Date
            </label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              className="form-control"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-semibold">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emergencyContact" className="form-label fw-semibold">
              Emergency Contact
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              className="form-control"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="isActive" className="form-label fw-semibold">
              Is Active
            </label>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              className="form-check-input"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}