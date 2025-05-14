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
    <Container className="mt-4">
      <h2 className="text-center mb-4">🌿 Apply for Leave</h2>

      {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}

      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <Form.Group controlId="leaveType" className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Control
                as="select"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick">Sick</option>
                <option value="Vacation">Vacation</option>
                <option value="Personal">Personal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="startDate" className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="endDate" className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="reason" className="mb-3">
              <Form.Label>Reason for Leave</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-100"
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
