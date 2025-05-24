import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Spinner, Alert } from 'react-bootstrap';

function LeaveEligibilityPage() {
  const [leaveEligibility, setLeaveEligibility] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaveEligibility = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/leave-applications/eligibility', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leave eligibility data');
        }

        const data = await response.json();
        setLeaveEligibility(data); // Set the leave eligibility data
      } catch (err) {
        console.error('Error fetching leave eligibility data:', err);
        setError('Failed to load leave eligibility data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveEligibility();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Quicksand, sans-serif', color: '#053963', fontWeight: 'bold' }}>
        LEAVE ELIGIBILITY
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
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Leave Type</th>
                <th>Balance</th>
                <th>Used</th>
                <th>Year</th>
                <th>Leave Type Name</th>
              </tr>
            </thead>
            <tbody>
              {leaveEligibility.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4" style={{ color: '#6c757d' }}>
                    No leave eligibility data found.
                  </td>
                </tr>
              ) : (
                leaveEligibility.map((eligibility) => (
                  <tr key={eligibility.id}>
                    <td>{eligibility.id}</td>
                    <td>{eligibility.userId}</td>
                    <td>{eligibility.leaveType}</td>
                    <td>
                      <Badge bg="success">{eligibility.balance}</Badge>
                    </td>
                    <td>
                      <Badge bg="danger">{eligibility.used}</Badge>
                    </td>
                    <td>{eligibility.year}</td>
                    <td>{eligibility.leaveTypeName}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default LeaveEligibilityPage;