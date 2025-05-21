import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Spinner, Alert, Button, Form, Row, Col } from 'react-bootstrap';
import bgImage from '../assets/background-img.jpg';

function LeavePoliciesPage() {
  const [leavePolicies, setLeavePolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creditMessage, setCreditMessage] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState(null); // State for the selected policy
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLeavePolicies = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/admin/leave-policies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leave policies');
        }

        const data = await response.json();
        setLeavePolicies(data); // Set the leave policies data
      } catch (err) {
        console.error('Error fetching leave policies:', err);
        setError('Failed to load leave policies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeavePolicies();
  }, []);

  const handleDeletePolicy = async (policyId) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

    const response = await fetch(`http://localhost:8080/api/admin/leave-policies/${policyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete leave policy');
    }

    setLeavePolicies((prevPolicies) =>
      prevPolicies.filter((policy) => policy.id !== policyId)
    ); // Remove the deleted policy from the state
    setActionMessage('Leave policy deleted successfully!');
  } catch (err) {
    console.error('Error deleting leave policy:', err);
    setActionMessage('Failed to delete leave policy. Please try again later.');
  }
};

  const handleCreditLeaves = async () => {
    setCreditMessage(''); // Clear any previous messages
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

      const response = await fetch('http://localhost:8080/api/admin/credit-leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to credit leaves');
      }

      setCreditMessage('Leaves credited successfully!');
    } catch (err) {
      console.error('Error crediting leaves:', err);
      setCreditMessage('Failed to credit leaves. Please try again later.');
    }
  };

  const handleUpdatePolicy = async (policyId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

      const response = await fetch(`http://localhost:8080/api/admin/leave-policies/${policyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch policy details');
      }

      const data = await response.json();
      setSelectedPolicy(data); // Set the selected policy for editing
    } catch (err) {
      console.error('Error fetching policy details:', err);
      setActionMessage('Failed to load policy details. Please try again later.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedPolicy({
      ...selectedPolicy,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActionMessage('');
  
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
  
      // Include the `id` in the request body
      const requestBody = {
        ...selectedPolicy,
        id: selectedPolicy.id, // Ensure the `id` is part of the body
      };
  
      const response = await fetch('http://localhost:8080/api/admin/leave-policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
        },
        body: JSON.stringify(requestBody), // Send the updated policy data with `id` in the body
      });
  
      if (!response.ok) {
        throw new Error('Failed to update leave policy');
      }
  
      setActionMessage('Leave policy updated successfully!');
      setSelectedPolicy(null); // Clear the form after successful update
      setLeavePolicies((prevPolicies) =>
        prevPolicies.map((policy) =>
          policy.id === selectedPolicy.id ? selectedPolicy : policy
        )
      );
    } catch (err) {
      console.error('Error updating leave policy:', err);
      setActionMessage('Failed to update leave policy. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancelUpdate = () => {
    setSelectedPolicy(null); // Clear the selected policy and hide the form
  };

  return (
    <div
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      width: '100vw', // makes sure it covers full screen width
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }}
    >
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{
        fontFamily: "Quicksand",
        fontWeight: 'bold',
        color: '#000957', }}>
        LEAVE POLICIES
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
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={handleCreditLeaves}>
              Credit Leave
            </Button>
          </div>
          {creditMessage && (
            <Alert
              variant={creditMessage.includes('successfully') ? 'success' : 'danger'}
              className="text-center"
            >
              {creditMessage}
            </Alert>
          )}
          {actionMessage && (
            <Alert
              variant={actionMessage.includes('successfully') ? 'success' : 'danger'}
              className="text-center"
            >
              {actionMessage}
            </Alert>
          )}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Description</th>
                <th>Annual Credit</th>
                <th>Max Accumulation</th>
                <th>Carry Forward</th>
                <th>Min Duration</th>
                <th>Max Duration</th>
                <th>Notice Required</th>
                <th>Applicable Roles</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leavePolicies.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-4" style={{ color: '#6c757d' }}>
                    No leave policies found.
                  </td>
                </tr>
              ) : (
                leavePolicies.map((policy) => (
                  <tr key={policy.id}>
                    <td>{policy.leaveType}</td>
                    <td>{policy.description}</td>
                    <td>{policy.annualCredit}</td>
                    <td>{policy.maxAccumulation}</td>
                    <td>
                      <Badge bg={policy.isCarryForward ? 'success' : 'danger'}>
                        {policy.isCarryForward ? 'Yes' : 'No'}
                      </Badge>
                    </td>
                    <td>{policy.minDuration}</td>
                    <td>{policy.maxDuration}</td>
                    <td>{policy.noticeRequired} days</td>
                    <td>
                      {policy.applicableRoles.join(', ')}
                    </td>
                    <td>
                      <Badge bg={policy.isActive ? 'success' : 'danger'}>
                        {policy.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleUpdatePolicy(policy.id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePolicy(policy.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {selectedPolicy && (
            <div className="mt-5">
              <h3 className="text-center mb-4">Update Leave Policy</h3>
              <Form onSubmit={handleFormSubmit} className="shadow p-4 rounded bg-light">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="leaveType" className="mb-3">
                      <Form.Label>Leave Type</Form.Label>
                      <Form.Control
                        type="text"
                        name="leaveType"
                        value={selectedPolicy.leaveType}
                        onChange={handleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="annualCredit" className="mb-3">
                      <Form.Label>Annual Credit</Form.Label>
                      <Form.Control
                        type="number"
                        name="annualCredit"
                        value={selectedPolicy.annualCredit}
                        onChange={handleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={selectedPolicy.description}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={handleCancelUpdate}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Policy'}
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </>
      )}
    </Container>
    </div>
  );
}

export default LeavePoliciesPage;