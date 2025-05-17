import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Button,
} from 'react-bootstrap';

function AdminDashboard({ onNavigate }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creditMessage, setCreditMessage] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/admin/dashboard-stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }

        const data = await response.json();

        // Update the summary state with totalUsers
        setSummary((prevSummary) => ({
          ...prevSummary,
          totalEmployees: data.totalUsers,
          totalManagers: data.roleDistribution.MANAGER
        }));

        setError(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const handleCreditLeaves = async () => {
    setCreditMessage(''); // Clear any previous messages
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

      const response = await fetch('http://localhost:8080/api/admin/credit-leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
        },
      });

      if (response.ok) {
        setCreditMessage('Leaves credited successfully!');
      } else {
        setCreditMessage('Failed to credit leaves. Please try again.');
      }
    } catch (error) {
      console.error('Error crediting leaves:', error);
      setCreditMessage('An error occurred. Please try again.');
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#e3f2fd', padding: '2rem 0' }}>
        <h2 className="text-center text-primary fw-bold">🛠 Admin Dashboard</h2>
      </div>

      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {error && (
          <Alert variant="danger" className="text-center mb-4">
            Failed to load admin dashboard data.
          </Alert>
        )}

        {/* Stats */}
        <Row className="g-4 justify-content-center mb-4">
          <Col md={5}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Total Employees</Card.Title>
                <Card.Text className="display-5 fw-bold text-primary">
                  {summary?.totalEmployees ?? 0}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Total Managers</Card.Title>
                <Card.Text className="display-5 fw-bold text-secondary">
                  {summary?.totalManagers ?? 0}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="g-4 justify-content-center mb-4">
          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('create-leave')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📄</div>
                <Card.Text className="fw-semibold mt-2">Create Leave Type</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center shadow-sm border-0 h-100">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>➕</div>
                <Card.Text className="fw-semibold mt-2">Credit Leaves</Card.Text>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handleCreditLeaves}
                >
                  Credit Leaves
                </Button>
                {creditMessage && (
                  <Alert
                    variant={creditMessage.includes('success') ? 'success' : 'danger'}
                    className="mt-3"
                  >
                    {creditMessage}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('update-policy')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>⚙️</div>
                <Card.Text className="fw-semibold mt-2">Update Leave Policy</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('reports')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📊</div>
                <Card.Text className="fw-semibold mt-2">View Full Reports</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#e3f2fd',
          padding: '1rem 0',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.9rem',
        }}
      >
        © {new Date().getFullYear()} Leave Management Portal — Admin Panel
      </div>
    </div>
  );
}

export default AdminDashboard;