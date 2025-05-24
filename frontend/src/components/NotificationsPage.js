import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Button } from 'react-bootstrap';

function NotificationsPage() {
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [markAllMessage, setMarkAllMessage] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        // Fetch unread notifications
        const unreadResponse = await fetch('http://localhost:8080/api/notifications/unread', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!unreadResponse.ok) {
          throw new Error('Failed to fetch unread notifications');
        }

        const unreadData = await unreadResponse.json();
        setUnreadNotifications(unreadData);

        // Fetch all notifications
        const allResponse = await fetch('http://localhost:8080/api/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!allResponse.ok) {
          throw new Error('Failed to fetch all notifications');
        }

        const allData = await allResponse.json();
        setAllNotifications(allData);

        setError(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  // Function to mark all notifications as read
  const handleMarkAllAsRead = async () => {
    setMarkAllMessage(''); // Clear any previous messages
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

      const response = await fetch('http://localhost:8080/api/notifications/read-all', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }

      // Update the unread notifications state to empty
      setUnreadNotifications([]);
      setMarkAllMessage('All notifications marked as read successfully!');
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setMarkAllMessage('Failed to mark all notifications as read. Please try again later.');
    }
  };

  // Sort unread notifications by updatedAt in descending order
  const sortedUnreadNotifications = [...unreadNotifications].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#e3f2fd', padding: '2rem 0' }}>
        <h2 className="text-center text-primary fw-bold">🔔 Notifications</h2>
      </div>

      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {/* Mark All as Read Button */}
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        </div>

        {/* Display Mark All Message */}
        {markAllMessage && (
          <Alert
            variant={markAllMessage.includes('successfully') ? 'success' : 'danger'}
            className="text-center"
          >
            {markAllMessage}
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="text-center mb-4">
            Failed to load notifications. Please try again later.
          </Alert>
        )}

        {/* Unread Notifications Section */}
        <Row className="g-4 mb-5">
          <Col>
            <h4 className="text-primary fw-bold">Unread Notifications</h4>
            {sortedUnreadNotifications.length === 0 ? (
              <Alert variant="info" className="text-center">
                No unread notifications.
              </Alert>
            ) : (
              sortedUnreadNotifications.map((notification, index) => (
                <Card key={index} className="mb-3 shadow-sm">
                  <Card.Body>
                    <Card.Title>{notification.title || 'Notification'}</Card.Title>
                    <Card.Text>{notification.message}</Card.Text>
                    <small className="text-muted">
                      {formatDate(notification.updatedAt)}
                    </small>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>

        {/* All Notifications Section */}
        <Row className="g-4">
          <Col>
            <h4 className="text-primary fw-bold">All Notifications</h4>
            {allNotifications.length === 0 ? (
              <Alert variant="info" className="text-center">
                No notifications available.
              </Alert>
            ) : (
              allNotifications.map((notification, index) => (
                <Card key={index} className="mb-3 shadow-sm">
                  <Card.Body>
                    <Card.Title>{notification.title || 'Notification'}</Card.Title>
                    <Card.Text>{notification.message}</Card.Text>
                    <small className="text-muted">
                      {formatDate(notification.updatedAt)}
                    </small>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#e3f2fd',
          padding: '1rem 0',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.9rem',
        }}
      >
        © {new Date().getFullYear()} Leave Management Portal — Notifications
      </div>
    </div>
  );
}

export default NotificationsPage;