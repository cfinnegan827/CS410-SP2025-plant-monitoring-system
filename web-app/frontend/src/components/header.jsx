import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useLocation } from "react-router-dom";


function Header() {

  const location = useLocation();

  return (
    
      <div className="header">
        { location.pathname !== "/" && (
          <div className="headerLogo title">
          <Link to="/">The Martian Project</Link>
        </div>
        )
        }
        <div className='headerLinks'>
          
            <Link to="/" className="link">Home</Link>
            <Link to="/dashboard" className="link">Dashboard</Link>
            <Link to="/about" className="link">About</Link>
          
        </div>
      </div>
    
  );
}

export default Header;
