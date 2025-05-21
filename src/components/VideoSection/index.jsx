import React from 'react';
import { useState } from 'react';
import './index.css';
import androidScanner from "../../assets/android.png";
import iphoneScanner from "../../assets/android.png";

const VideoSection = ({ videoSrc, overlayText, onButtonClick }) => {
  const [showModal, setShowModal] = useState(false);
  // Define a new function to handle the button click
  const handleButtonClick = () => {
    // Define the text to be shared on Twitter
    const text = "Report Toxic Algae #toxic #algae #cyanobacteria #cyanoHAB #UGA @cyanotracker!";

    // Encode the text for URL
    const encodedText = encodeURIComponent(text);

    // Construct the Twitter share URL with the encoded text
    const twitterUrl = `https://twitter.com/share?text=${encodedText}&url=http://www.cyanotracker.uga.edu`;

    // Open the URL in a new tab
    window.open(twitterUrl, "_blank");
    
    // Call the original onButtonClick if it's provided
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <div className="video-section">
      <video autoPlay loop muted className="background-video">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <div className="overlay-text">
          {overlayText}
        </div>
        <div className="overlay-button-container">
          <button className="overlay-button" onClick={handleButtonClick} >
            Tweet about CyanoHAB
          </button>
          <a href="https://chintanmaniyar.users.earthengine.app/view/cyanokhoj-india" target="_blank" rel="noopener noreferrer">
            <button className="overlay-button">GEE Dashboard</button>
          </a>
          <button className='mobileapp' onClick={() => setShowModal(true)}>Mobile App</button>
        </div>
            {/* Modal */}
          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>
                  We’re excited to announce the launch of the CyanoTRACKER mobile app,
                  now available on both iOS and Android!
                </h2>
                <p>
                  Download the app to quickly report cyanobacterial harmful algal
                  blooms (CyanoHABs) wherever you are. <br />
                  Scan the QR codes below to get started.
                </p>

                <div className="qr-section">
                  <div className="qr-block">
                    <p><strong>Android</strong></p>
                    <img src={androidScanner} alt="Android QR" />
                  </div>
                  <div className="qr-block">
                    <p><strong>iOS</strong></p>
                    <img src={iphoneScanner} alt="iOS QR" />
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default VideoSection;
