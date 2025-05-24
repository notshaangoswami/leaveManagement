// UserProfile.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

function UserProfile() {
  const [profile, setProfile] = useState({ name: '', department: '', manager: '' });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();

        setProfile({
          name: data.fullName,
          department: data.department,
          manager: data.managerName,
        });

        setError(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#e3f2fd', padding: '2rem 0' }}>
        <h2 className="text-center text-primary fw-bold">👤 User Profile</h2>
      </div>

      <Container className="py-5" style={{ maxWidth: '600px' }}>
        {error && (
          <Alert variant="danger" className="text-center mb-4">
            Failed to load profile data.
          </Alert>
        )}
        <Row className="g-4 justify-content-center">
          <Col md={12}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Name</Card.Title>
                <Card.Text className="display-6 fw-bold text-primary">
                  {profile.name || 'N/A'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Department</Card.Title>
                <Card.Text className="display-6 fw-bold text-secondary">
                  {profile.department || 'N/A'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Manager</Card.Title>
                <Card.Text className="display-6 fw-bold text-success">
                  {profile.manager || 'N/A'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div
        style={{
          backgroundColor: '#e3f2fd',
          padding: '1rem 0',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.9rem',
        }}
      >
        © {new Date().getFullYear()} Leave Management Portal — User Profile
      </div>
    </div>
  );
}

export default UserProfile;
