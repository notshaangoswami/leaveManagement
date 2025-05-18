import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = (role) => {
    console.log('User role after login:', role);
    localStorage.setItem('userRole', JSON.stringify(role));
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    navigate('/login');
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(JSON.parse(storedRole));
    }
    setIsLoading(false);
  }, []);

  const ShowNavbar = () => {
    const location = useLocation();
    return userRole && location.pathname !== '/login' ? <Navbar onLogout={handleLogout} /> : null;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ShowNavbar />
      <AppRouter userRole={userRole} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
    </>
  );
}

export default App;