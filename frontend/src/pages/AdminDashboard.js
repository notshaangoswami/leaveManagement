import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Button,
  Modal,
} from 'react-bootstrap';
import HolidayCalendar from "../components/HolidayCalendar";
import '../css/AdminDashboard.css'

function AdminDashboard({ onNavigate }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exportMessage, setExportMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

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

        // Update the summary state with totalUsers and roleDistribution
        setSummary({
          totalEmployees: data.totalUsers,
          totalManagers: data.roleDistribution.MANAGER,
        });

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

  const handleViewReportsClick = () => {
    setShowModal(true); // Show the modal when "View Full Reports" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setExportMessage(''); // Clear any previous export messages
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
      // <div className="dashboard-wrapper">
      //   <Container className="dashboard-container">
      //
      //     <div className="dashboard-header text-center">
      //       <h1 className="dashboard-title">🛠️ Admin Dashboard</h1>
      //     </div>
      //
      //     <Row className="dashboard-metrics text-center mb-4">
      //       <Col md={6}>
      //         <Card className="metric-card">
      //           <Card.Body>
      //             <Card.Title>Total Employees</Card.Title>
      //             <Card.Text className="metric-value">3</Card.Text>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //       <Col md={6}>
      //         <Card className="metric-card">
      //           <Card.Body>
      //             <Card.Title>Total Managers</Card.Title>
      //             <Card.Text className="metric-value">1</Card.Text>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //     </Row>
      //
      //     <Row className="dashboard-actions text-center mb-4">
      //       <Col md={4}>
      //         <Card className="action-card">
      //           <Card.Body>
      //             <Card.Title>Create Leave Policy</Card.Title>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //       <Col md={4}>
      //         <Card className="action-card">
      //           <Card.Body>
      //             <Card.Title>Credit Leaves</Card.Title>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //       <Col md={4}>
      //         <Card className="action-card">
      //           <Card.Body>
      //             <Card.Title>View Full Reports</Card.Title>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //     </Row>
      //
      //     <div className="calendar-section text-center">
      //       <h4>Holiday Calendar</h4>
      //       <HolidayCalendar/>
      //       <Button className="mt-3" variant="success">+ Add New Holiday</Button>
      //     </div>
      //
      //     <footer className="dashboard-footer text-center mt-5">
      //       © 2025 Leave Management Portal — Admin Panel
      //     </footer>
      //
      //   </Container>
      // </div>

      <div className="dashboard-container dashboard-wrapper" >
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="text-center dashboard-title">🛠 Admin Dashboard</h1>
        </div>

        <Container className="py-5" style={{ maxWidth: '960px' }}>
          {error && (
            <Alert variant="danger" className="text-center mb-4">
              Failed to load admin dashboard data.
            </Alert>
          )}

          {/* Stats */}
          <Row className="g-4 justify-content-center dashboard-metrics text-center mb-4">
            {/* Total Employees Card */}
            <Col md={4}>
              <Card className="text-center shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-semibold text-muted">Total Employees</Card.Title>
                  <Card.Text className="display-5 fw-bold text-primary">
                    {summary?.totalEmployees || 0}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Total Managers Card */}
            <Col md={4}>
              <Card className="text-center shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-semibold text-muted">Total Managers</Card.Title>
                  <Card.Text className="display-5 fw-bold text-success">
                    {summary?.totalManagers || 0}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Other Cards */}
          <Row className="g-4 justify-content-center dashboard-actions text-center mb-4">
            <Col md={3}>
              <Card
                className="shadow-sm h-100 action-card"
                onClick={() => onNavigate('create-leave-policy')}
                style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
              >
                <Card.Body>
                  <div className="card-icon">📄</div>
                  <Card.Text className="fw-semibold mt-2">Create Leave Policy</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                className="text-center shadow-sm border-0 card-hover h-100"
                onClick={() => onNavigate('leave-policies')} // Navigate to LeavePoliciesPage
                style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
              >
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>➕</div>
                  <Card.Text className="fw-semibold mt-2">Credit Leaves</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                className="text-center shadow-sm border-0 card-hover h-100"
                onClick={handleViewReportsClick} // Show modal on click
                style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
              >
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>📊</div>
                  <Card.Text className="fw-semibold mt-2">View Full Reports</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Modal for Export Options */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Export Reports</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <Button
                variant="success"
                className="m-2"
                onClick={() => handleExport('excel')}
              >
                Download as Excel
              </Button>
              <Button
                variant="danger"
                className="m-2"
                onClick={() => handleExport('pdf')}
              >
                Download as PDF
              </Button>
            </div>
            {exportMessage && (
              <Alert
                variant={exportMessage.includes('success') ? 'success' : 'danger'}
                className="mt-3"
              >
                {exportMessage}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <HolidayCalendar />

        {/* Footer */}
        <div className="footer" >
          © {new Date().getFullYear()} Leave Management Portal — Admin Panel
        </div>
      </div>
  );
}

export default AdminDashboard;