// src/components/LeaveForm.js

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { applyLeave } from '../services/api'; // Assume this API exists

function LeaveForm() {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await applyLeave({
        leaveType,
        startDate,
        endDate,
        reason,
      });
      if (response.status === 200) {
        setMessage('Leave applied successfully!');
      } else {
        setMessage('Failed to apply leave. Please try again.');
      }
    } catch (error) {
      console.error('Error applying leave:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#2b6cb0' }}>🌿 Apply for Leave</h2>

      {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}

      <Row className="justify-content-center">
        <Col md={6} className="p-4 rounded shadow-lg bg-light">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="leaveType" className="mb-3">
              <Form.Label style={{ color: '#2b6cb0', fontWeight: 'bold' }}>Leave Type</Form.Label>
              <Form.Control
                as="select"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
                className="custom-select-input"
              >
                <option value="">Select Leave Type</option>
                <option value="Sick">Sick</option>
                <option value="Vacation">Vacation</option>
                <option value="Personal">Personal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="startDate" className="mb-3">
              <Form.Label style={{ color: '#2b6cb0', fontWeight: 'bold' }}>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="custom-select-input"
              />
            </Form.Group>

            <Form.Group controlId="endDate" className="mb-3">
              <Form.Label style={{ color: '#2b6cb0', fontWeight: 'bold' }}>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="custom-select-input"
              />
            </Form.Group>

            <Form.Group controlId="reason" className="mb-3">
              <Form.Label style={{ color: '#2b6cb0', fontWeight: 'bold' }}>Reason for Leave</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="custom-select-input"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-100"
              style={{ backgroundColor: '#2b6cb0', borderColor: '#2b6cb0', fontSize: '16px', padding: '10px' }}
            >
              {isSubmitting ? 'Applying...' : 'Apply Leave'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LeaveForm;
