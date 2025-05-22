// Navbar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FaBell } from 'react-icons/fa'; // Import bell icon
import Badge from 'react-bootstrap/Badge'; // Import Badge for the notification count
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal'; // Import Modal for the logout confirmation
import { VscAccount } from "react-icons/vsc";
import "../css/Navbar.css";
import "../css/DarkModeToggle.css";
import BackIcon from "../assets/back-white.png";

function BasicExample({ onLogout }) {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for modal visibility


  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const response = await fetch('http://localhost:8080/api/notifications/unread-count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch unread notification count');
        }

        const count = await response.json(); // Directly parse the number
        setUnreadCount(count); // Set the count directly
      } catch (error) {
        console.error('Error fetching unread notification count:', error);
      }
    };

    fetchUnreadCount();

    // Optionally, poll for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Dark Mode Toggle
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleNotificationsClick = () => {
    navigate('/notifications'); // Navigate to the notifications page
  };

  const handleChangePasswordClick = () => {
    navigate('/change-password');
  };
  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the confirmation modal
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false); // Close the modal
    onLogout(); // Call the logout function
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Close the modal without logging out
  };

  return (
    // <>
    //   <Navbar expand="lg" className="bg-body-tertiary">
    //     <Container>
    //       <Button
    //         variant="outline-none"
    //         onClick={() => navigate(-1)}
    //         style={{ display: 'flex', alignItems: 'center', gap: '5px', marginRight: '25px'}}
    //       >
    //         <img src={BackIcon} alt="Back" width="16" height="16" />
    //       </Button>
    //
    //       <Navbar.Brand href="/dashboard" className="d-flex align-items-center gap-2">
    //         <img
    //           src="leave.png"
    //           alt="Logo"
    //           width="50"
    //           height="50"
    //           className="rounded-circle"
    //         />
    //         <span className="brand-name">LEAVEit</span></Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="me-auto"></Nav>
    //         <div className="d-flex gap-3 align-items-center">
    //           {/* Bell Icon with Unread Count */}
    //           <div
    //             style={{ position: 'relative', cursor: 'pointer' }}
    //             onClick={handleNotificationsClick}
    //           >
    //             <FaBell size={20} />
    //             <Badge
    //               bg={unreadCount > 0 ? 'danger' : 'secondary'} // Use 'danger' for >0, 'secondary' for 0
    //               pill
    //               style={{
    //                 position: 'absolute',
    //                 top: '-5px',
    //                 right: '-10px',
    //                 fontSize: '0.75rem',
    //               }}
    //             >
    //               {unreadCount}
    //             </Badge>
    //           </div>
    //           <Dropdown align="end">
    //             <Dropdown.Toggle
    //               variant="outline-primary"
    //               id="dropdown-basic"
    //               style={{
    //                 padding: 0,
    //                 border: 'none',
    //                 background: 'none',
    //                 borderRadius: '50%', // Make the toggle circular
    //                 width: '40px', // Set a fixed width
    //                 height: '40px', // Set a fixed height
    //                 display: 'flex', // Center the icon
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //               }}
    //             >
    //               <VscAccount
    //                 size={30} // Adjust the size of the icon
    //                 style={{
    //                   color: '#007bff', // Set the color of the icon
    //                 }}
    //               />
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu>
    //               <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
    //               <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
    //               <Dropdown.Item onClick={handleChangePasswordClick}>Change Password</Dropdown.Item>
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         </div>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    //   {/* Logout Confirmation Modal */}
    //   <Modal show={showLogoutModal} onHide={handleCancelLogout} centered>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Confirm Logout</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>Are you sure you want to log out?</Modal.Body>
    //     <Modal.Footer>
    //       <Button
    //         variant="info" // Change to light blue
    //         style={{ backgroundColor: '#add8e6', borderColor: '#add8e6' }} // Custom light blue color
    //         onClick={handleCancelLogout}
    //       >
    //         Cancel
    //       </Button>
    //       <Button
    //         variant="info" // Change to light blue
    //         style={{ backgroundColor: '#add8e6', borderColor: '#add8e6' }} // Custom light blue color
    //         onClick={handleConfirmLogout}
    //       >
    //         Logout
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </>

      <>
        {/*<Navbar expand="lg" className="custom-navbar shadow-sm">*/}
        <Navbar expand="lg" className={`navbar ${darkMode ? 'dark' : ''}`}>
        <Container fluid>
            <Button
                variant="link"
                className="nav-back-btn"
                onClick={() => navigate(-1)}
            >
              <img src={BackIcon} alt="Back" width="18" height="18"/>
            </Button>

            <Navbar.Brand href="/dashboard" className="d-flex align-items-center gap-2">
              <img
                  src="leave.png"
                  alt="Logo"
                  width="45"
                  height="45"
                  className="rounded-circle shadow-sm"
              />
              <span className="brand-name text-light fw-semibold">LEAVEit</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="d-flex align-items-center gap-4">

                {/* Notifications */}
                <div
                    className="position-relative notification-icon"
                    onClick={handleNotificationsClick}
                    title="Notifications"
                >
                  <FaBell size={22}/>
                  {/*<Badge*/}
                  {/*    bg={unreadCount > 0 ? 'danger' : 'secondary'}*/}
                  {/*    pill*/}
                  {/*    className="notification-badge"*/}
                  {/*>*/}
                  {/*  {unreadCount}*/}
                  {/*</Badge>*/}
                  <Badge
                      bg={unreadCount > 0 ? 'danger' : 'secondary'}
                      pill
                      className={`notification-badge ${unreadCount > 0 ? 'pulsing' : ''}`}
                  >
                    {unreadCount}
                  </Badge>

                </div>

                {/* Account Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle
                      variant="link"
                      className="p-0 border-0 nav-avatar-btn"
                  >
                    <VscAccount size={28}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow-sm custom-dropdown-menu">
                    <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleChangePasswordClick}>Change Password</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button
                    variant={darkMode ? 'light' : 'dark'}
                    onClick={() => setDarkMode(!darkMode)}
                    title="Toggle Dark Mode"
                >
                  {darkMode ? '🌞' : '🌙'}
                </Button>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Logout Confirmation Modal */}
        <Modal show={showLogoutModal} onHide={handleCancelLogout} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelLogout}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirmLogout}>Logout</Button>
          </Modal.Footer>
        </Modal>
      </>

  );
}

export default BasicExample;