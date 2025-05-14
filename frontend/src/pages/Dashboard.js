import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { getDashboardSummary } from '../services/api';

function Dashboard({ onNavigate }) {
  const [summary, setSummary] = useState({
    leavesApplied: 0,
    leavesRemaining: 0,
    pendingApprovals: 0,
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardSummary();
        if (data) {
          setSummary(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError(true);
      }
    }

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-5 text-info" style={{ fontFamily: 'Poppins, sans-serif' }}>🌿 Leave Dashboard</h2>

      {error && (
        <Alert variant="danger" className="text-center">
          Could not fetch live data. Showing default values.
        </Alert>
      )}

      {/* Dashboard summary cards */}
      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card border="primary" className="shadow-lg custom-card">
            <Card.Body>
              <Card.Title>📄 Leaves Applied</Card.Title>
              <Card.Text className="display-6 text-primary">{summary.leavesApplied}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card border="success" className="shadow-lg custom-card">
            <Card.Body>
              <Card.Title>✅ Leaves Remaining</Card.Title>
              <Card.Text className="display-6 text-success">{summary.leavesRemaining}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card border="warning" className="shadow-lg custom-card">
            <Card.Body>
              <Card.Title>⏳ Pending Approvals</Card.Title>
              <Card.Text className="display-6 text-warning">{summary.pendingApprovals}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Buttons for Leave Form, Leave History, and Approvals */}
      <Row className="g-4 justify-content-center mt-4">
        <Col md={4}>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => onNavigate('apply-leave')}
            className="shadow-lg custom-button"
          >
            Apply for Leave
          </Button>
        </Col>

        <Col md={4}>
          <Button
            variant="warning"
            size="lg"
            block
            onClick={() => onNavigate('leave-history')}
            className="shadow-lg custom-button"
          >
            Leave History
          </Button>
        </Col>

        <Col md={4}>
          <Button
            variant="success"
            size="lg"
            block
            onClick={() => onNavigate('leave-approval')}
            className="shadow-lg custom-button"
          >
            Approve Leaves
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
