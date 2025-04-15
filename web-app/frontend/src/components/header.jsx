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
        <div className='headerLinks text'>
          
            <Link to="/" className="link">Home</Link>
            <a href="#about" className="link">About</a>
            <Link to="/login" className="link">Log In</Link>
          
        </div>
      </div>
    
  );
}

export default Header;
