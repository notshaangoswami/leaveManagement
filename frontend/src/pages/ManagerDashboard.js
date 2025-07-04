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
import '../css/ManagerDashboard.css'
import bgImage from "../assets/background-img1.jpg";

function ManagerDashboard({ onNavigate }) {
  const [leavesRemaining, setLeavesRemaining] = useState(0);
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch leaves remaining
    const fetchLeavesRemaining = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/users/leave-balance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leave balance');
        }

        const data = await response.json();

        // Calculate total balance by summing up all leave balances
        const totalBalance = data.reduce((sum, leave) => sum + leave.balance, 0);
        setLeavesRemaining(totalBalance); // Set the total balance
      } catch (err) {
        console.error('Error fetching leave balance:', err);
        setError(true);
      }
    };

    // Fetch pending approvals count
    const fetchPendingApprovalsCount = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        const response = await fetch('http://localhost:8080/api/leave-approvals/pending', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pending approvals');
        }

        const data = await response.json();
        setPendingApprovalsCount(data.length); // Set the total count of pending approvals
      } catch (err) {
        console.error('Error fetching pending approvals:', err);
        setError(true);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchLeavesRemaining(), fetchPendingApprovalsCount()]);
      setLoading(false);
    };

    fetchData();
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
      //     <h2 className="text-center text-info fw-bold">🧑‍💼 Manager Dashboard</h2>
      //   </div>
      //
      //   <Container className="py-5" style={{ maxWidth: '960px' }}>
      //     {error && (
      //       <Alert variant="danger" className="text-center mb-4">
      //         Failed to load dashboard data.
      //       </Alert>
      //     )}
      //
      //     {/* Summary Cards */}
      //     <Row className="g-4 justify-content-center mb-4">
      //       <Col md={4}>
      //         <Card className="text-center shadow-sm border-0">
      //           <Card.Body>
      //             <Card.Title className="fw-semibold text-muted">Leaves Remaining</Card.Title>
      //             <Card.Text className="display-5 fw-bold text-success">
      //               {leavesRemaining}
      //             </Card.Text>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //
      //       <Col md={4}>
      //         <Card className="text-center shadow-sm border-0">
      //           <Card.Body>
      //             <Card.Title className="fw-semibold text-muted">Pending Approvals</Card.Title>
      //             <Card.Text className="display-5 fw-bold text-warning">
      //               {pendingApprovalsCount}
      //             </Card.Text>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //     </Row>
      //
      //     {/* Manager Action Cards */}
      //     <Row className="g-4 justify-content-center mb-5">
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
      //
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
      //
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
      //
      //       <Col md={3}>
      //         <Card
      //           className="text-center shadow-sm border-0 h-100"
      //           onClick={() => onNavigate('leave-approval')}
      //           style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
      //         >
      //           <Card.Body>
      //             <div style={{ fontSize: '2rem' }}>✅</div>
      //             <Card.Text className="fw-semibold mt-2">Approve Requests</Card.Text>
      //           </Card.Body>
      //         </Card>
      //       </Col>
      //     </Row>
      //   </Container>
      //
      //   <HolidayCalendar />
      //   {/* Footer */}
      //   <div
      //     style={{
      //       backgroundColor: '#e3f2fd',
      //       padding: '1rem 0',
      //       textAlign: 'center',
      //       color: '#6c757d',
      //       fontSize: '0.9rem',
      //     }}
      //   >
      //     © {new Date().getFullYear()} Leave Management Portal — Manager Panel
      //   </div>
      // </div>


      <div className="dashboard-container-manager dashboard-wrapper"
      
      style={{
        
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="text-center dashboard-title">‍💼 Manager Dashboard</h1>
        </div>

        <Container className="py-5" style={{maxWidth: '960px'}}>
          {error && (
              <Alert variant="danger" className="text-center mb-4">
                Failed to load admin dashboard data.
              </Alert>
          )}

          {/* Stats */}
          <Row className="g-4 justify-content-center dashboard-metrics text-center mb-4">
            {/* Leaves Remaining Card */}
            <Col md={4}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-semibold text-muted">Leaves Remaining</Card.Title>
                  <Card.Text className="display-5 fw-bold text-success">
                    {leavesRemaining}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Pending Approvals Card */}
            <Col md={4}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-semibold text-muted">Pending Approvals</Card.Title>
                  <Card.Text className="display-5 fw-bold text-warning">
                    {pendingApprovalsCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Manager Action Cards */}
          <Row className="g-4 justify-content-center dashboard-actions text-center mb-4">
            <Col md={3}>
              <Card
                  className="shadow-sm h-100 action-card"
                  onClick={() => onNavigate('apply-leave')}
                  style={{cursor: 'pointer', backgroundColor: '#e3f2fd'}}
              >
                <Card.Body>
                  <div style={{fontSize: '2rem'}}>📝</div>
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
                  <div style={{fontSize: '2rem'}}>📚</div>
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
                  <div style={{fontSize: '2rem'}}>📋</div>
                  <Card.Text className="fw-semibold mt-2">View Eligibility</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                  className="shadow-sm h-100 action-card"
                  onClick={() => onNavigate('leave-approval')}
                  style={{cursor: 'pointer', backgroundColor: '#e3f2fd'}}
              >
                <Card.Body>
                  <div style={{fontSize: '2rem'}}>✅</div>
                  <Card.Text className="fw-semibold mt-2">Approve Requests</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <HolidayCalendar/>

        {/* Footer */}
        <div className="dashboard-footer text-center mt-5"
        style={{
          backgroundColor: '#030637',
          padding: '1rem 0',
          textAlign: 'center',
          color: '#E8F9FF',
          fontSize: '0.9rem',
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: 100,
        }}>
          © {new Date().getFullYear()} Leave Management Portal — Admin Panel
        </div>
      </div>
  );
}

export default ManagerDashboard;