import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LeaveForm from './components/LeaveForm';
import LeaveHistory from './components/LeaveHistory';
import LeaveApproval from './components/LeaveApproval';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // Default page is Dashboard

  // Function to handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handlePageChange} />
      <div className="content">
        {currentPage === 'dashboard' && <Dashboard onNavigate={handlePageChange} />}
        {currentPage === 'apply-leave' && <LeaveForm />}
        {currentPage === 'leave-history' && <LeaveHistory />}
        {currentPage === 'leave-approval' && <LeaveApproval />}
      </div>
    </div>
  );
}

export default App;
