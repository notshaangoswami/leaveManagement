import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';

// Simulating the fetched data
const mockPendingLeaves = [
  { id: 1, leaveType: 'Sick', startDate: '2023-05-01', endDate: '2023-05-03', reason: 'Fever' },
  { id: 2, leaveType: 'Vacation', startDate: '2023-04-20', endDate: '2023-04-22', reason: 'Family trip' },
];

function LeaveApproval() {
  const [pendingLeaves, setPendingLeaves] = useState([]);

  useEffect(() => {
    // Replace with your real API call
    setPendingLeaves(mockPendingLeaves);
  }, []);

  const handleApproval = (id, status) => {
    // Send the approval/rejection to backend API
    console.log(`Leave ID ${id} has been ${status}`);
    // Optionally update UI to remove processed leave
    setPendingLeaves((prev) => prev.filter((leave) => leave.id !== id));
  };

  return (
    <Container style={{ marginTop: '3rem', maxWidth: '900px' }}>
      <h2 className="mb-4" style={{ fontWeight: '700', color: '#343a40', textAlign: 'center' }}>
        📝 Pending Leave Approvals
      </h2>

      {pendingLeaves.length === 0 ? (
        <p className="text-center" style={{ color: '#6c757d' }}>
          No pending leave requests.
        </p>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th style={{ minWidth: '150px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingLeaves.map(({ id, leaveType, startDate, endDate, reason }) => (
              <tr key={id}>
                <td>{leaveType}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>{reason}</td>
                <td>
                  <Row className="g-2">
                    <Col>
                      <Button
                        variant="success"
                        size="sm"
                        style={{ width: '100%' }}
                        onClick={() => handleApproval(id, 'approved')}
                      >
                        Approve
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ width: '100%' }}
                        onClick={() => handleApproval(id, 'rejected')}
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
