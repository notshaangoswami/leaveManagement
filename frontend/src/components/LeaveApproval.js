import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

function LeaveApproval() {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingLeaves = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/leave-approvals/pending', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pending leave approvals');
        }

        const data = await response.json();
        setPendingLeaves(data);
      } catch (err) {
        console.error('Error fetching pending leaves:', err);
        setError('Failed to load pending leave approvals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingLeaves();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

      // Determine the endpoint based on the status
      const endpoint =
        status === 'APPROVED'
          ? `http://localhost:8080/api/leave-approvals/${id}/approve`
          : `http://localhost:8080/api/leave-approvals/${id}/reject`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${status.toLowerCase()} leave request`);
      }

      // Update UI to remove processed leave
      setPendingLeaves((prev) => prev.filter((leave) => leave.id !== id));
    } catch (err) {
      console.error(`Error ${status.toLowerCase()} leave request:`, err);
      setError(`Failed to ${status.toLowerCase()} leave request. Please try again.`);
    }
  };

  return (
    <Container style={{ marginTop: '3rem', maxWidth: '900px' }}>
      <h2 className="mb-4" style={{ fontWeight: '700', color: '#343a40', textAlign: 'center' }}>
        📝 Pending Leave Approvals
      </h2>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : pendingLeaves.length === 0 ? (
        <p className="text-center" style={{ color: '#6c757d' }}>
          No pending leave requests.
        </p>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
            <tr>
              <th>Username</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Number of Days</th>
              <th style={{ minWidth: '150px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingLeaves.map(({ id, username, startDate, endDate, reason, numberOfDays }) => (
              <tr key={id}>
                <td>{username}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>{reason}</td>
                <td>{numberOfDays}</td>
                <td>
                  <Row className="g-2">
                    <Col>
                      <Button
                        variant="success"
                        size="sm"
                        style={{ width: '100%' }}
                        onClick={() => handleApproval(id, 'APPROVED')}
                      >
                        Approve
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ width: '100%' }}
                        onClick={() => handleApproval(id, 'REJECTED')}
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default LeaveApproval;