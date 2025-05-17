import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Spinner, Alert } from 'react-bootstrap';

function LeaveHistory() {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/api/leave-applications/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leave history');
        }

        const data = await response.json();
        setLeaveData(data); // Set the leave data
      } catch (err) {
        console.error('Error fetching leave history:', err);
        setError('Failed to load leave history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      case 'PENDING':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#2b6cb0' }}>
        Leave History
      </h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Applied On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4" style={{ color: '#6c757d' }}>
                  No leave records found.
                  </td>
              </tr>
            ) : (
              leaveData.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{new Date(leave.appliedOn).toLocaleDateString()}</td> {/* Format the application date */}
                  <td>
                    <Badge bg={getStatusVariant(leave.status)} style={{ fontSize: '1rem' }}>
                      {leave.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default LeaveHistory;