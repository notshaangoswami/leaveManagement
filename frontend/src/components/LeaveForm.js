import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import bgImage from "../assets/bg1.png";

export default function LeaveForm() {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [superiorEmail, setSuperiorEmail] = useState('');
  const [attachmentPath, setAttachmentPath] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const leaveApplication = {
      leaveType,
      startDate,
      endDate,
      reason,
      contactAddress,
      contactPhone,
      superiorEmail,
      attachmentPath,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/api/leave-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
},
        body: JSON.stringify(leaveApplication),
      });

      if (response.ok) {
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
      <h2 className="text-center mb-4" style={{ fontFamily: "Quicksand, sans-serif", color: '#053963',fontWeight: 'bold'}}>APPLY FOR LEAVE</h2>

      {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}

      <Form onSubmit={handleSubmit}
      style={{
        backgroundColor: 'white',
        color: 'black'
      }} className="shadow p-4 rounded">
        <Form.Group controlId="leaveType" className="mb-3">
          <Form.Label>Leave Type</Form.Label>
          <Form.Control
            as="select"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="CASUAL">Casual</option>
            <option value="SICK">Sick</option>
            <option value="EARNED">Earned</option>
            <option value="SPECIAL">Special</option>
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
          <Form.Label>Reason</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="contactAddress" className="mb-3">
          <Form.Label>Contact Address</Form.Label>
          <Form.Control
            type="text"
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="superiorEmail" className="mb-3">
          <Form.Label>Superior Email-id</Form.Label>
          <Form.Control
            type="text"
            value={superiorEmail}
            onChange={(e) => setSuperiorEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          className="w-100"
        >
          {isSubmitting ? 'Submitting...' : 'Apply Leave'}
        </Button>
      </Form>
    </Container>
    </div>
  );
}