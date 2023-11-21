import React from 'react';
import './index.css';

const VideoSection = ({ videoSrc, overlayText, onButtonClick }) => {
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
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
