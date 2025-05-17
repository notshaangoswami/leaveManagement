import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from 'react-bootstrap';

function ManagerDashboard({ onNavigate }) {
  const [summary, setSummary] = useState(null);
  const [leavesRemaining, setLeavesRemaining] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch leaves remaining
    const fetchLeavesRemaining = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/users/leave-balance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leave balance');
        }

        const data = await response.json();

        // Calculate total balance by summing up all leave balances
        const totalBalance = data.reduce((sum, leave) => sum + leave.balance, 0);
        setLeavesRemaining(totalBalance); // Set the total balance
      } catch (err) {
        console.error('Error fetching leave balance:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeavesRemaining();
  }, []);

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
        <h2 className="text-center text-info fw-bold">🧑‍💼 Manager Dashboard</h2>
      </div>

      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {error && (
          <Alert variant="danger" className="text-center mb-4">
            Failed to load dashboard data.
          </Alert>
        )}

        {/* Summary Cards */}
        <Row className="g-4 justify-content-center mb-4">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Leaves Remaining</Card.Title>
                <Card.Text className="display-5 fw-bold text-success">
                  {leavesRemaining}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Pending Approvals</Card.Title>
                <Card.Text className="display-5 fw-bold text-warning">
                  {summary?.pendingApprovalsCount ?? 0}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Manager Action Cards */}
        <Row className="g-4 justify-content-center mb-5">
          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('apply-leave')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📝</div>
                <Card.Text className="fw-semibold mt-2">Apply for Leave</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('leave-history')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📚</div>
                <Card.Text className="fw-semibold mt-2">Leave History</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('leave-policy')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📘</div>
                <Card.Text className="fw-semibold mt-2">View Leave Policy</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('leave-approval')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>✅</div>
                <Card.Text className="fw-semibold mt-2">Approve Requests</Card.Text>
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
        © {new Date().getFullYear()} Leave Management Portal — Manager Panel
      </div>
    </div>
  );
}

export default ManagerDashboard;