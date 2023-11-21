import React, { useState } from "react";
import './index.css';
import logo from "../../assets/cyanoTRACKER_WEB.png";
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
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        {/* <li><Link to="/about" onClick={toggleMenu}>About US</Link></li>
        <li><Link to="/cyanoHAB" onClick={toggleMenu}>Report a CyanoHAB</Link></li> */}
        <li><Link to="/faq" onClick={toggleMenu}>FAQ</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
