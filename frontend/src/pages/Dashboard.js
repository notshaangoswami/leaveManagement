import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { getDashboardSummary } from '../services/api';

function Dashboard() {
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
    <Container className="mt-4">
      <h2 className="text-center mb-4">🌿 Leave Dashboard</h2>

      {error && (
        <Alert variant="danger" className="text-center">
          Could not fetch live data. Showing default values.
        </Alert>
      )}

      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card border="primary" className="shadow">
            <Card.Body>
              <Card.Title>📄 Leaves Applied</Card.Title>
              <Card.Text className="display-6 text-primary">{summary.leavesApplied}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card border="success" className="shadow">
            <Card.Body>
              <Card.Title>✅ Leaves Remaining</Card.Title>
              <Card.Text className="display-6 text-success">{summary.leavesRemaining}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card border="warning" className="shadow">
            <Card.Body>
              <Card.Title>⏳ Pending Approvals</Card.Title>
              <Card.Text className="display-6 text-warning">{summary.pendingApprovals}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
