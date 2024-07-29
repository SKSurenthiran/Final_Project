import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import Logo from '../../assets/Logo.png';

function NavBar() {
  return (
    <div className="Nav-bar-body">
      <div className="logo-image">
        <img src={Logo} alt="Debra logo" />
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/">
              <i className="bx bx-home-alt">Home</i>
            </Link>
          </li>
          <li>
            <Link to="/services">
              <i className='bx bxs-hard-hat'>Services</i>
            </Link>
          </li>
        
         
          <li>
            <Link to="/about">
              <i className="bx bx-building-house">About Us</i>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <i className="bx bx-phone-call">Contact Us</i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="login-btn">
        <Link to="/login">
          <button type="button"><img src={Logo} alt="" /> Login</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
