import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from 'react-bootstrap';
import HolidayCalendar from "../components/HolidayCalendar";
import '../css/EmployeeDashboard.css';

function EmployeeDashboard({ onNavigate }) {
  const [summary, setSummary] = useState({ leavesApplied: 0, leavesRemaining: 0 });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');
    
        const response = await fetch('http://localhost:8080/api/leave-applications/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch leave history');
        }
    
        const data = await response.json();
    
        // Filter only approved leaves
        const approvedLeaves = data.filter((leave) => leave.status === 'APPROVED');
    
        // Calculate the total number of approved leaves
        const totalApprovedLeaves = approvedLeaves.reduce((sum, leave) => sum + leave.numberOfDays, 0);
    
        // Update the summary state with approved leaves
        setSummary((prevSummary) => ({
          ...prevSummary,
          leavesApplied: totalApprovedLeaves,
        }));
    
        setError(false);
      } catch (err) {
        console.error('Error fetching leave history:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchLeaveBalance = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');
  
        const response = await fetch('http://localhost:8080/api/users/leave-balance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch leave balance');
        }
  
        const data = await response.json();
  
        // Calculate the total leave balance
        const totalBalance = data.reduce((sum, leave) => sum + leave.balance, 0);
  
        // Update the summary state with leaves remaining
        setSummary((prevSummary) => ({
          ...prevSummary,
          leavesRemaining: totalBalance,
        }));
  
        setError(false);
      } catch (err) {
        console.error('Error fetching leave balance:', err);
        setError(true);
      }
    };
  
    // Fetch both leave history and leave balance
    fetchLeaveHistory();
    fetchLeaveBalance();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    // <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
    //   {/* Header */}
    //   <div style={{ backgroundColor: '#e3f2fd', padding: '2rem 0' }}>
    //     <h2 className="text-center text-info fw-bold">🌿 Employee Dashboard</h2>
    //   </div>

    //   <Container className="py-5" style={{ maxWidth: '900px' }}>
    //     {error && (
    //       <Alert variant="danger" className="text-center mb-4">
    //         Failed to load dashboard data.
    //       </Alert>
    //     )}

    //     {/* Stats */}
    //     <Row className="g-4 justify-content-center mb-4">
    //       <Col md={5}>
    //         <Card className="text-center shadow-sm border-0">
    //           <Card.Body>
    //             <Card.Title className="fw-semibold text-muted">Leaves Applied</Card.Title>
    //             <Card.Text className="display-5 fw-bold text-primary">
    //               {summary.leavesApplied}
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col md={5}>
    //         <Card className="text-center shadow-sm border-0">
    //           <Card.Body>
    //             <Card.Title className="fw-semibold text-muted">Leaves Remaining</Card.Title>
    //             <Card.Text className="display-5 fw-bold text-success">
    //               {summary.leavesRemaining}
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>

    //     {/* Action Buttons as Cards */}
    //     <Row className="g-4 justify-content-center">
    //       <Col md={3}>
    //         <Card
    //           className="text-center shadow-sm border-0 h-100"
    //           onClick={() => onNavigate('apply-leave')}
    //           style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
    //         >
    //           <Card.Body>
    //             <div style={{ fontSize: '2rem' }}>📝</div>
    //             <Card.Text className="fw-semibold mt-2">Apply for Leave</Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col md={3}>
    //         <Card
    //           className="text-center shadow-sm border-0 h-100"
    //           onClick={() => onNavigate('leave-history')}
    //           style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
    //         >
    //           <Card.Body>
    //             <div style={{ fontSize: '2rem' }}>📚</div>
    //             <Card.Text className="fw-semibold mt-2">Leave History</Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col md={3}>
    //         <Card
    //           className="text-center shadow-sm border-0 h-100"
    //           onClick={() => onNavigate('leave-eligibility')} // Navigate to LeaveEligibilityPage
    //           style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
    //         >
    //           <Card.Body>
    //             <div style={{ fontSize: '2rem' }}>📋</div>
    //             <Card.Text className="fw-semibold mt-2">View Eligibility</Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Container>

    <div className="dashboard-container-employee dashboard-wrapper">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="text-center dashboard-title">Employee Dashboard</h1>
        </div>

        <Container className="py-5" style={{maxWidth: '960px'}}>
          {error && (
              <Alert variant="danger" className="text-center mb-4">
                Failed to load admin dashboard data.
              </Alert>
          )}

          {/* Stats */}
          <Row className="g-4 justify-content-center dashboard-metrics text-center mb-4">
            {/* Total Employees Card */}
            <Col md={5}>
              <Card className="text-center shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-semibold text-muted">Leaves Applied</Card.Title>
                  <Card.Text className="display-5 fw-bold text-primary">
                    {summary.leavesApplied}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={5}>
              <Card className="text-center shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-semibold text-muted">Leaves Remaining</Card.Title>
                  <Card.Text className="display-5 fw-bold text-success">
                    {summary.leavesRemaining}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Action Button as Cards */}
          <Row className="g-4 justify-content-center dashboard-actions text-center mb-4">
            <Col md={3}>
              <Card
                  className="shadow-sm h-100 action-card"
                  onClick={() => onNavigate('apply-leave')}
                  style={{cursor: 'pointer', backgroundColor: '#e3f2fd'}}
              >
                <Card.Body>
                  <div className="card-icon">📄</div>
                  <Card.Text className="fw-semibold mt-2">Apply for Leave</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                  className="shadow-sm h-100 action-card"
                  onClick={() => onNavigate('leave-history')} 
                  style={{cursor: 'pointer', backgroundColor: '#e3f2fd'}}
              >
                <Card.Body>
                  <div className="card-icon">➕</div>
                  <Card.Text className="fw-semibold mt-2">Leave History</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                  className="shadow-sm h-100 action-card"
                  onClick={() => onNavigate('leave-eligibility')} // Navigate to LeaveEligibilityPage
                  style={{cursor: 'pointer', backgroundColor: '#e3f2fd'}}
              >
                <Card.Body>
                  <div className="card-icon">📋</div>
                    <Card.Text className="fw-semibold mt-2">View Eligibility</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

      <HolidayCalendar/>

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
        © {new Date().getFullYear()} Leave Management Portal — Employee Panel
      </div>
    </div>
  );
}

export default EmployeeDashboard;