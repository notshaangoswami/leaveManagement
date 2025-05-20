import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/HolidayCalendar.css';
import CreateLeaveAdmin from './CreateLeaveAdmin'; 
import { Button, Modal, Form } from 'react-bootstrap';


function HolidayCalendar() {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [userRole, setUserRole] = useState('USER');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedHoliday, setEditedHoliday] = useState({ name: '', description: '', type: '' });

  const openEditModal = () => {
    setEditedHoliday({ ...selectedHoliday }); // prefill
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    await updateHoliday(editedHoliday);
    setShowEditModal(false);
  };

  const fetchHolidaysByMonthAndYear = async (month, year) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/holidays/month/${month}/year/${year}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setHolidays(data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    fetchHolidaysByMonthAndYear(currentDate.getMonth() + 1, currentDate.getFullYear());
    const role = localStorage.getItem('userRole');
    try {
      const parsedRole = JSON.parse(role); // handles case when role is stored as JSON string
      if (Array.isArray(parsedRole)) {
        setUserRole(parsedRole[0]); // Take the first role, e.g., 'ADMIN'
      } else {
        setUserRole(parsedRole);
      }
    } catch (err) {
      setUserRole(role); // fallback if it's just a string
    }
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateStr = date.toLocaleDateString('en-CA');
    const holiday = getEffectiveHolidays(date.getFullYear()).find((h) => h.date === dateStr);
    setSelectedHoliday(holiday || null);
  };

  const getEffectiveHolidays = (year) => {
    return holidays.flatMap(h => {
      if (h.isRecurring) {
        const originalDate = new Date(h.date);
        const recurringDate = new Date(year, originalDate.getMonth(), originalDate.getDate());
        return [{ ...h, date: recurringDate.toLocaleDateString('en-CA') }];
      }
      return [h];
    });
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toLocaleDateString('en-CA');
      const holiday = getEffectiveHolidays(date.getFullYear()).find((h) => h.date === dateStr);
      if (holiday) {
        return holiday.type.toLowerCase() === 'national' ? 'national-holiday' : 'admin-holiday';
      }
    }
    return null;
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toLocaleDateString('en-CA');
      const holiday = getEffectiveHolidays(date.getFullYear()).find((h) => h.date === dateStr);
      if (holiday) {
        return (<div className="holiday-name" title={holiday.description}>{holiday.name}</div>);
      }
    }
    return null;
  };

  const updateHoliday = async (updatedHoliday) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/holidays/${updatedHoliday.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedHoliday)
      });
      if (response.ok) {
        alert('Holiday updated');
        fetchHolidaysByMonthAndYear(selectedDate.getMonth() + 1, selectedDate.getFullYear());
      }
    } catch (err) {
      console.error('Failed to update holiday:', err);
    }
  };

  const deleteHoliday = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/holidays/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        alert('Holiday deleted');
        setSelectedHoliday(null);
        fetchHolidaysByMonthAndYear(selectedDate.getMonth() + 1, selectedDate.getFullYear());
      }
    } catch (err) {
      console.error('Failed to delete holiday:', err);
    }
  };

  return (
    <div className="calendar-container">
      <h3>Holiday Calendar</h3>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={getTileClassName}
        tileContent={getTileContent}
        onActiveStartDateChange={({ activeStartDate }) => {
          fetchHolidaysByMonthAndYear(activeStartDate.getMonth() + 1, activeStartDate.getFullYear());
        }}
      />

      {/* Holiday Details card if any */}
      {selectedHoliday && (
        <div className="holiday-details">
          <h4>Holiday Details</h4>
          <p><strong>{selectedHoliday.name}</strong></p>
          <p>Type: {selectedHoliday.type}</p>
          <p>Description: {selectedHoliday.description}</p>

          {userRole === 'ADMIN' && (
            <>
              <Button variant="warning" onClick={openEditModal}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => deleteHoliday(selectedHoliday.id)}>Delete</Button>
            </>
          )}

        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedHoliday.name}
                onChange={(e) => setEditedHoliday({ ...editedHoliday, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editedHoliday.description}
                onChange={(e) => setEditedHoliday({ ...editedHoliday, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={editedHoliday.type}
                onChange={(e) => setEditedHoliday({ ...editedHoliday, type: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>


      {/* Admin-only Create Holiday Button + Modal */}
      {userRole === 'ADMIN' && (
        <>
          <Button variant="success" className="mt-3" onClick={() => setShowCreateModal(true)}>
            + Add New Holiday
          </Button>
          <CreateLeaveAdmin
            show={showCreateModal}
            onHide={() => setShowCreateModal(false)}
            onCreated={() => {
              const current = selectedDate || new Date();
              fetchHolidaysByMonthAndYear(current.getMonth() + 1, current.getFullYear());
            }}
          />
        </>
      )}
    </div>
  );
}

export default HolidayCalendar;
