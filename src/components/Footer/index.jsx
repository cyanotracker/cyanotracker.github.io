
import './index.css';
import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>CyanoTRACKER</h3>
        <p>Monitoring and Reporting Algal Blooms</p>
        <div className="social-links">
          <a href="https://twitter.com/CyanoTracker" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.instagram.com/cyanotracker/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.facebook.com/cyanotracker/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
