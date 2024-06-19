import React, { useState } from "react";
import './index.css';
import logo from "../../assets/Cyano_Poster_new.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="logo" className="navbar-logo" />
      </Link>
      <div className="social-icons">
        <a rel="noopener" href="https://twitter.com/cyanotracker" style={{'textDecoration':'none'}}><i class="ri-twitter-x-fill" style={{fontSize: '15px'}}></i></a>
        <a rel="noopener" href="https://www.facebook.com/cyanotracker/" style={{'textDecoration':'none'}}><i class="ri-facebook-circle-fill" style={{fontSize: '18px'}}></i></a>
      </div>
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
        <li><Link to="/Form" onClick={toggleMenu}>Report a Bloom</Link></li>
        <li><Link to="/Teams" onClick={toggleMenu}>Our Team</Link></li>
         <li><Link to="/faq" onClick={toggleMenu}>FAQ</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
