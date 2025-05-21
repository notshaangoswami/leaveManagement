import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // For making the POST request
import bgImage from '../assets/background-img.jpg';

function CreateLeavePolicy() {
  const [leaveType, setLeaveType] = useState('');
  const [description, setDescription] = useState('');
  const [annualCredit, setAnnualCredit] = useState('');
  const [maxAccumulation, setMaxAccumulation] = useState('');
  const [isCarryForward, setIsCarryForward] = useState(false);
  const [minDuration, setMinDuration] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [noticeRequired, setNoticeRequired] = useState('');
  const [applicableRoles, setApplicableRoles] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (role) => {
    if (applicableRoles.includes(role)) {
      setApplicableRoles(applicableRoles.filter((r) => r !== role));
    } else {
      setApplicableRoles([...applicableRoles, role]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const payload = {
      leaveType,
      description,
      annualCredit: parseFloat(annualCredit),
      maxAccumulation: parseFloat(maxAccumulation),
      isCarryForward,
      minDuration: parseInt(minDuration, 10),
      maxDuration: parseInt(maxDuration, 10),
      noticeRequired: parseInt(noticeRequired, 10),
      applicableRoles,
      isActive,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/admin/leave-policies', payload);
      if (response.status === 200 || response.status === 201) {
        setMessage('Leave policy created successfully!');
      } else {
        setMessage('Failed to create leave policy. Please try again.');
      }
    } catch (error) {
      console.error('Error creating leave policy:', error);
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
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{
        fontFamily: "Quicksand",
        fontWeight: 'bold',
        color: '#000957',

      }}>CREATE LEAVE POLICY</h2>

      {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}

      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <Form.Group controlId="leaveType" className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="EARNED">EARNED</option>
                <option value="CASUAL">CASUAL</option>
                <option value="SICK">SICK</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter leave policy description"
                required
              />
            </Form.Group>

            <Form.Group controlId="annualCredit" className="mb-3">
              <Form.Label>Annual Credit</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={annualCredit}
                onChange={(e) => setAnnualCredit(e.target.value)}
                placeholder="Enter annual credit (e.g., 12)"
                required
              />
            </Form.Group>

            <Form.Group controlId="maxAccumulation" className="mb-3">
              <Form.Label>Max Accumulation</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={maxAccumulation}
                onChange={(e) => setMaxAccumulation(e.target.value)}
                placeholder="Enter max accumulation (e.g., 30)"
                required
              />
            </Form.Group>

            <Form.Group controlId="isCarryForward" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Allow Carry Forward"
                checked={isCarryForward}
                onChange={(e) => setIsCarryForward(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="minDuration" className="mb-3">
              <Form.Label>Min Duration</Form.Label>
              <Form.Control
                type="number"
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                placeholder="Enter minimum duration (e.g., 1)"
                required
              />
            </Form.Group>

            <Form.Group controlId="maxDuration" className="mb-3">
              <Form.Label>Max Duration</Form.Label>
              <Form.Control
                type="number"
                value={maxDuration}
                onChange={(e) => setMaxDuration(e.target.value)}
                placeholder="Enter maximum duration (e.g., 10)"
                required
              />
            </Form.Group>

            <Form.Group controlId="noticeRequired" className="mb-3">
              <Form.Label>Notice Required (Days)</Form.Label>
              <Form.Control
                type="number"
                value={noticeRequired}
                onChange={(e) => setNoticeRequired(e.target.value)}
                placeholder="Enter notice period (e.g., 2)"
                required
              />
            </Form.Group>

            <Form.Group controlId="applicableRoles" className="mb-3">
              <Form.Label>Applicable Roles</Form.Label>
              <div>
                {['ADMIN', 'EMPLOYEE', 'MANAGER'].map((role) => (
                  <Form.Check
                    key={role}
                    type="checkbox"
                    label={role}
                    checked={applicableRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="isActive" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-100"
            >
              {isSubmitting ? 'Creating...' : 'Create Leave Policy'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default CreateLeavePolicy;