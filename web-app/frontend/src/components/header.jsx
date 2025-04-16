import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the user is logged in by checking a token in localStorage
  const isLoggedIn = localStorage.getItem('userToken');

  const handleLogout = () => {
    // Remove the user token from localStorage to log out the user
    localStorage.removeItem('userToken');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="header">
      { location.pathname !== "/" && (
        <div className="headerLogo title">
          <Link to="/">The Martian Project</Link>
        </div>
      )}
      <div className='headerLinks text'>
        <Link to="/" className="link">Home</Link>
        <a href="/#about" className="link">About</a>
        
        {!isLoggedIn ? (
          // If the user is not logged in, show "Log In" link
          <Link to="/login" className="link">Log In</Link>
        ) : (
          // If the user is logged in, show "Sign Out" link
          <>
            <Link to="/dashboard" className="link">Dashboard</Link>
            <button onClick={handleLogout} className="link">Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
