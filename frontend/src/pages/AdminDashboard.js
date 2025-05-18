import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Button, // Button is imported here
} from 'react-bootstrap';
function AdminDashboard({ onNavigate }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exportMessage, setExportMessage] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/admin/dashboard-stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }

        const data = await response.json();

        // Update the summary state with totalUsers
        setSummary((prevSummary) => ({
          ...prevSummary,
          totalEmployees: data.totalUsers,
          totalManagers: data.roleDistribution.MANAGER,
        }));

        setError(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const handleExport = async (type) => {
    setExportMessage(''); // Clear any previous messages
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
      const url =
        type === 'excel'
          ? 'http://localhost:8080/api/reports/leave-usage/export/excel'
          : 'http://localhost:8080/api/reports/leave-usage/export/pdf';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to export report as ${type.toUpperCase()}`);
      }

      // Process the response as a blob
      const blob = await response.blob();
      const fileName = `leave-usage-report.${type === 'excel' ? 'xlsx' : 'pdf'}`;

      // Create a downloadable link
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link); // Append the link to the DOM
      link.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(link); // Remove the link from the DOM

      setExportMessage(`Report exported successfully as ${type.toUpperCase()}!`);
    } catch (error) {
      console.error(`Error exporting report as ${type}:`, error);
      setExportMessage(`An error occurred while exporting as ${type.toUpperCase()}. Please try again.`);
    }
  };

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
        <h2 className="text-center text-primary fw-bold">🛠 Admin Dashboard</h2>
      </div>

      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {error && (
          <Alert variant="danger" className="text-center mb-4">
            Failed to load admin dashboard data.
          </Alert>
        )}

        {/* Stats */}
        <Row className="g-4 justify-content-center mb-4">
          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('create-leave-policy')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ fontSize: '2rem' }}>📄</div>
                <Card.Text className="fw-semibold mt-2">Create Leave Policy</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('leave-policies')} // Navigate to LeavePoliciesPage
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ fontSize: '2rem' }}>➕</div>
                <Card.Text className="fw-semibold mt-2">Credit Leaves</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="text-center shadow-sm border-0 h-100"
              onClick={() => onNavigate('update-policy')}
              style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ fontSize: '2rem' }}>⚙️</div>
                <Card.Text className="fw-semibold mt-2">Update Leave Policy</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ fontSize: '2rem' }}>📊</div>
                <Card.Text className="fw-semibold mt-2">View Full Reports</Card.Text>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={() => handleExport('excel')}
                >
                  Export as Excel
                </Button>
                <Button
                  variant="danger"
                  className="mt-3"
                  onClick={() => handleExport('pdf')}
                >
                  Export as PDF
                </Button>
                {exportMessage && (
                  <Alert
                    variant={exportMessage.includes('success') ? 'success' : 'danger'}
                    className="mt-3"
                  >
                    {exportMessage}
                  </Alert>
                )}
              </Card.Body>
            </Card>
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
        © {new Date().getFullYear()} Leave Management Portal — Admin Panel
      </div>
    </div>
  );
}

export default AdminDashboard;