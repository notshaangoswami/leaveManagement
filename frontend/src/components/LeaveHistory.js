import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';

// Simulating the fetched data
const mockLeaveData = [
  { id: 1, leaveType: 'Sick', startDate: '2023-05-01', endDate: '2023-05-03', status: 'Approved' },
  { id: 2, leaveType: 'Casual', startDate: '2023-04-15', endDate: '2023-04-17', status: 'Pending' },
];

function LeaveHistory() {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch this from your API
    setLeaveData(mockLeaveData);
  }, []);

  // Helper for status badge color
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Container style={{ marginTop: '3rem', maxWidth: '900px' }}>
      <h2 className="mb-4" style={{ fontWeight: '700', color: '#343a40', textAlign: 'center' }}>
        🗓️ Your Leave History
      </h2>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
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
    </Container>
  );
}

export default LeaveHistory;
