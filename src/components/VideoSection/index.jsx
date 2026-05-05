import React from 'react';
import { useState,useEffect,useRef } from 'react';
import './index.css';
import iphoneScanner from "../../assets/ios:android-scanner.png";
import playstoreicon from "../../assets/PlayStoreIcon.png";
import appstoreicon from "../../assets/AppStoreIcon.png";

const VideoSection = ({ videoSrc, overlayText, onButtonClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);  // Defining a useref Hook for the dropdown menu

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


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
      
            <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-btn"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              GEE Dashboards
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    window.open(
                      "https://chintanmaniyar.users.earthengine.app/view/cyanokhoj-india",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  CyanoKhoj
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    window.open(
                      "https://ee-chintanmaniyar.projects.earthengine.app/view/nps-habdashboard",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  NPS Atlanta
                </div>
              </div>
            )}
          </div>

          <button className='mobileapp' onClick={() => setShowModal(true)}>Mobile App</button>
        </div>

        
        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>
                New App Launch: HAB Reporter in iOS/Android
              </h2>
              <p>
                Quickly report harmful algal blooms from anywhere - whether you're at home or out enjoying a lake.
                Every report makes helps the community stay safe!

              </p>

              <div className="qr-section">
              
                <div className="qr-block">
                  <p><strong>iOS / Android</strong></p>
                  <img class="qr-image" src={iphoneScanner} alt="iOS QR" />
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