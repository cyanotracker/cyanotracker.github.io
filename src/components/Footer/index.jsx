import React from 'react';
import './index.css';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import uga from './uga.png';
import SponsorDisplay from '../SponsorDisplay'; // Import the SponsorDisplay component
import nsf from '../../assets/nsf.png';
import nasa from '../../assets/nasa.png';

const sponsors = [
  {
    name: 'National Science Foundation (NSF)',
    logoUrl: nsf, // Replace with actual logo path
    programs: [
      { name: 'Cyber-Innovation for Sustainability Science and Engineering (CyberSEES)', awardNumber: '1442672' }
    ]
  },
  {
    name: 'National Aeronautics and Space Administration (NASA)',
    logoUrl: nasa, // Replace with actual logo path
    programs: [
      { name: 'Earth Science Research from Operational Geostationary Satellite Systems', awardNumber: '80NSSC23K1258' },
      { name: 'Future Investigators in NASA Earth and Space Science and Technology', awardNumber: '80NSSC24K0068' }
    ]
  }
];


const Footer = () => {
  return (
    <footer className="footer">
        {/*
      <div className="footer-top">
      
      <h3>CyanoTRACKER</h3>
      <p>Monitoring and Reporting Algal Blooms</p>
        *
        <div className="social-links">
           Social links 
        </div>
      </div>
      */}
      <div className="footer-upper">
        <SponsorDisplay sponsors={sponsors} />
        <div className="hosted-contact-info">
          <div className="hosted-by">
            <img src={uga} alt="University of Georgia Logo" style={{width:'200px'}} className="uga-logo" />
            <p>Hosted by the <a href="https://www.uga.edu/" target="_blank" rel="noopener noreferrer" style={{color:'white'}}>University of Georgia</a></p>
          </div>
          <span className="contact-info">
            <p>Contact us:</p>
           
            <a href="mailto:cyanotracker@gmail.com">cyanotracker@gmail.com</a>&nbsp; &nbsp; &nbsp;
            <a href="mailto:dmishra@uga.edu">dmishra@uga.edu</a>

            <p id="follow-us">Follow us:</p>
            <a rel="noopener" href="https://twitter.com/cyanotracker" style={{'textDecoration':'none'}}><i className="ri-twitter-x-fill"></i></a> &nbsp;
           
           <a rel="noopener" href=" https://www.facebook.com/cyanotracker/" style={{'textDecoration':'none'}}><i className="ri-facebook-circle-fill"></i></a>
          </span>
        </div>
      </div>
      {/* Other footer content if any */}
    </footer>
  );
};


export default Footer;