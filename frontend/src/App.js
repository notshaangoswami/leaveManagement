import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReportsPage from './pages/ReportsPage'; // Import ReportsPage

import LeaveForm from './components/LeaveForm';
import LeaveHistory from './components/LeaveHistory';
import LeaveApproval from './components/LeaveApproval';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole] = useState('manager'); // 'employee', 'manager', or 'admin'

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderDashboard = () => {
    if (userRole === 'employee') return <EmployeeDashboard onNavigate={handlePageChange} />;
    if (userRole === 'manager') return <ManagerDashboard onNavigate={handlePageChange} />;
    if (userRole === 'admin') return <AdminDashboard onNavigate={handlePageChange} />;
    return <p>Unauthorized</p>;
  };

  return (
    <div className="App">
      <Navbar onNavigate={handlePageChange} userRole={userRole} />
      <div className="content">
        {currentPage === 'dashboard' && renderDashboard()}

        {currentPage === 'apply-leave' && <LeaveForm onNavigate={handlePageChange} />}
        {currentPage === 'leave-history' && <LeaveHistory onNavigate={handlePageChange} />}
        {currentPage === 'leave-approval' && <LeaveApproval onNavigate={handlePageChange} />}

        {/* Render ReportsPage only for admin */}
        {currentPage === 'reports' && userRole === 'admin' && (
          <ReportsPage onNavigate={handlePageChange} />
        )}
      </div>
    </div>
  );
}

export default App;
