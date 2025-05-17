import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const handleLoginSuccess = (role) => {
    console.log('User role after login:', role); // Debugging
    localStorage.setItem('userRole', JSON.stringify(role)); // Persist the role
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole'); // Clear the persisted role
    setUserRole(null);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(JSON.parse(storedRole)); // Restore the role from localStorage
    }
    setIsLoading(false); // Mark loading as complete
  }, []);

  const ShowNavbar = () => {
    const location = useLocation();
    // Show Navbar only if userRole is set and the current route is not "/login"
    return userRole && location.pathname !== '/login' ? <Navbar onLogout={handleLogout} /> : null;
  };

  if (isLoading) {
    // Show a loading spinner or placeholder while restoring userRole
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ShowNavbar />
      <AppRouter userRole={userRole} onLoginSuccess={handleLoginSuccess} />
    </Router>
  );
}

export default App;