import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReportsPage from './pages/ReportsPage'; // Import ReportsPage
import LoginPage from './pages/LoginPage';

import LeaveForm from './components/LeaveForm';
import LeaveHistory from './components/LeaveHistory';
import LeaveApproval from './components/LeaveApproval';
import CalendarComponent from "./components/Calendar";


function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Tracks the current page
  const [userRole, setUserRole] = useState(null); // Stores the role of the logged-in user

  const handleLoginSuccess = (role) => {
    setUserRole(role); // Set the user's role
    setCurrentPage('dashboard'); // Navigate to the dashboard
  };

  const handleLogout = () => {
    setUserRole(null); // Clear the user's role
    setCurrentPage('login'); // Redirect to the login page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderDashboard = () => {
    if (userRole.includes('ADMIN')) return <AdminDashboard onNavigate={handlePageChange}/>;
    if (userRole.includes('MANAGER')) return <ManagerDashboard onNavigate={handlePageChange} />;
    if (userRole.includes('EMPLOYEE')) return <EmployeeDashboard onNavigate={handlePageChange} />;
    return <p>Unauthorized</p>; // Fallback for unknown roles
  };

  return (
    <div>
      {currentPage === 'dashboard' && <Navbar onLogout={handleLogout} onNavigate={handlePageChange} />}
      {currentPage === 'apply-leave' && <LeaveForm onNavigate={handlePageChange} />}
        {currentPage === 'leave-history' && <LeaveHistory onNavigate={handlePageChange} />}
        {currentPage === 'leave-approval' && <LeaveApproval onNavigate={handlePageChange} />}

        {/* Render ReportsPage only for admin */}
        {currentPage === 'reports' && userRole.includes('ADMIN') && (
          <ReportsPage onNavigate={handlePageChange} />
        )}
      {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && renderDashboard()}
    </div>
  );
}

export default App;