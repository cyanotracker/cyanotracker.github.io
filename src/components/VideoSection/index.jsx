import React from 'react';
import { useState } from 'react';
import './index.css';
import iphoneScanner from "../../assets/ios:android-scanner.png";
import playstoreicon from "../../assets/PlayStoreIcon.png";
import appstoreicon from "../../assets/AppStoreIcon.png";

const VideoSection = ({ videoSrc, overlayText, onButtonClick }) => {
  const [showModal, setShowModal] = useState(false);
  // Define a new function to handle the button click
  const handleButtonClick = () => {
    // Define the text to be shared on Twitter
    const text = "Report Toxic Algae #toxic #algae #cyanobacteria #cyanoHAB #UGA @cyanotracker!";

    // Encode the text for URLs
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
                  New App Launch: HAB Reporter in iOS
                </h2>
                <p>
                Quickly report harmful algal blooms from anywhere - whether you're at home or out enjoying a lake. 
                Every report makes helps the community stay safe!
      
                </p>

                <div className="qr-section">
                  {/* <div className="qr-block">
                    <p><strong>Android</strong></p>
                    <img src={androidScanner} alt="Android QR" />
                  </div> */}
                  <div className="qr-block">
                    <p><strong>iOS / Android</strong></p>
                    <img class= "qr-image"src={iphoneScanner} alt="iOS QR" />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <a
                        href="https://apps.apple.com/us/app/hab-reporter/id6747082399"
                        target="_blank"
                        rel="noop=ener noreferrer"
                      >
                        <img
                          src={appstoreicon} // or your actual image path
                          alt="Download on the App Store"
                          className="app-store-badge"
                        />

                      </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.chintan.cynaotrackerorg"
                        target="_blank"
                        rel="noop=ener noreferrer"
                      >
                      <img
                        src={playstoreicon} // or your actual image path
                        alt="Download on the Play Store"
                        className="play-store-badge"
                      />
                    </a>
                    </div>
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
