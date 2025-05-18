import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDashboard from '../pages/EmployeeDashboard';
import ManagerDashboard from '../pages/ManagerDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import ReportsPage from '../pages/ReportsPage';
import LoginPage from '../pages/LoginPage';
import LeaveForm from '../components/LeaveForm';
import LeaveHistory from '../components/LeaveHistory';
import LeaveApproval from '../components/LeaveApproval';
import UserProfile from '../components/UserProfile'; // Import the UserProfile component
import CreateLeavePolicy from '../components/CreateLeavePolicy'; // Import the CreateLeavePolicy component
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import RegistrationPage from '../pages/RegistrationPage';
import NotificationsPage from '../components/NotificationsPage'; // Import the NotificationsPage component
import LeavePoliciesPage from '../pages/LeavePoliciesPage'; // Import the LeavePoliciesPage component
import LeaveEligibilityPage from '../components/LeaveEligibility';





import { useNavigate } from 'react-router-dom';

const AppRouter = ({ userRole, onLoginSuccess, onLogout }) => {
  console.log('AppRouter received userRole:', userRole); // Debugging

  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(`/${path}`);
  };

  const renderDashboard = () => {
    console.log('Current user role in renderDashboard:', userRole); // Debugging
    if (userRole?.includes('ADMIN')) return <AdminDashboard onNavigate={onNavigate}/>;
    if (userRole?.includes('MANAGER')) return <ManagerDashboard onNavigate={onNavigate}/>;
    if (userRole?.includes('EMPLOYEE')) return <EmployeeDashboard onNavigate={onNavigate} />;
    return <p>Unauthorized</p>; // Fallback for unknown roles
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
      <Route
        path="/dashboard"
        element={userRole ? renderDashboard() : <Navigate to="/login" />}
      />
      <Route path="/notifications" element={<NotificationsPage />} /> {/* Add this route */}
      <Route path="/apply-leave" element={<LeaveForm />} />
      <Route path="/leave-history" element={<LeaveHistory />} />
      <Route path="/leave-approval" element={<LeaveApproval />} />
      <Route path="/profile" element={<UserProfile />} /> {/* Add this route */}
      <Route path="/create-leave-policy" element={<CreateLeavePolicy />} /> {/* Add this route */}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/leave-policies" element={<LeavePoliciesPage />} />
      <Route path="/leave-eligibility" element={<LeaveEligibilityPage />} />
      <Route path="*" element={<Navigate to={userRole ? '/dashboard' : '/login'} />} />
    </Routes>
  );
};

export default AppRouter;