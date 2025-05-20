// CreateLeaveAdmin.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateLeaveAdmin({ show, onHide, onCreated }) {
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newRecurring, setNewRecurring] = useState(false);

  const handleCreate = async () => {
    const token = localStorage.getItem('token');
    const holiday = {
      name: newName,
      date: newDate,
      type: newType,
      description: newDesc,
      recurring: newRecurring
    };

    try {
      const response = await fetch('http://localhost:8080/api/holidays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(holiday)
      });

      if (response.ok) {
        alert('Holiday created successfully!');
        onCreated?.();
        // Reset form
        setNewName('');
        setNewDate('');
        setNewType('');
        setNewDesc('');
        setNewRecurring(false);
        onHide(); // Close modal
      } else {
        alert('Failed to create holiday');
      }
    } catch (error) {
      console.error('Error creating holiday:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Holiday</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Holiday Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter holiday name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="NATIONAL or ADMIN"
              value={newType}
              onChange={e => setNewType(e.target.value.toUpperCase())}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Holiday description"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Recurring"
              checked={newRecurring}
              onChange={e => setNewRecurring(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleCreate}>Create Holiday</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateLeaveAdmin;
