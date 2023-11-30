
import './index.css';
import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import uga from './uga.png';

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
          {/* Add LinkedIn icon link if needed */}
          {/* <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a> */}
        </div>
        {/* University of Georgia Info */}
        <div className="hosted-by">
          <img src={uga} alt="University of Georgia Logo" style={{width:'200px'}} className="uga-logo" />
          <p>Hosted by the <a href="https://www.uga.edu/" target="_blank" rel="noopener noreferrer" style={{color:'white'}}>University of Georgia</a></p>
        </div>
        {/* Additional Footer Content */}
      </div>
    </footer>
  );
};
export default Footer;
