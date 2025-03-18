import React, { useState } from "react";
import './index.css';
import logo from "../../assets/cyano_newlogo-removebg-preview.png";
import { Link } from 'react-router-dom';
import earth from "../../assets/earth-engine.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
  setIsOpen((prevIsOpen) => {
    const newState = !prevIsOpen;
    
    if (newState) {
      document.body.classList.add('navbar-open');
      localStorage.setItem('navbarState', 'open'); // Store state
    } else {
      document.body.classList.remove('navbar-open');
      localStorage.setItem('navbarState', 'closed'); // Store state
    }

    return newState;
  });
};

  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="logo" className="navbar-logo" />
      </Link>
      <div className="social-icons">
        <p id="follow-us">Follow us</p>
        <a rel="noopener" href="https://twitter.com/cyanotracker" style={{ 'textDecoration': 'none' }}>
          <i className="ri-twitter-x-fill" style={{ fontSize: '15px' }}></i>
        </a>
        <a rel="noopener" href="https://www.facebook.com/cyanotracker/" style={{ 'textDecoration': 'none' }}>
          <i className="ri-facebook-circle-fill" style={{ fontSize: '18px' }}></i>
        </a>
        <a rel="noopener" href="https://www.linkedin.com/in/cyano-tracker-992002140/" style={{ 'textDecoration': 'none' }}>
          <i className="ri-linkedin-fill" style={{ fontSize: '18px' }}></i>
        </a>
      </div>
      {/* <Link to="https://chintanmaniyar.users.earthengine.app/view/cyanokhoj-india">
          <img src={earth} alt="google-earth-engine" className="earth-engine"/>
      </Link>
    */}
   

      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/publications" onClick={toggleMenu}>Publications</Link></li>
        <li><Link to="/Cyanosense2" onClick={toggleMenu}>Cyanosense 2.0</Link></li>
        <li><Link to="/Map" onClick={toggleMenu}>Cyano Map</Link></li>
        <li><Link to="/Gallery" onClick={toggleMenu}>Gallery</Link></li>
        <li><Link to="/Form" onClick={toggleMenu}>Report a Bloom</Link></li>
        <li><Link to="/Teams" onClick={toggleMenu}>Our Team</Link></li>
        <li><Link to="/faq" onClick={toggleMenu}>FAQ</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
