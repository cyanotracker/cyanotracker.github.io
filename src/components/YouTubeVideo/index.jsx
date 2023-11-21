import React from 'react';
import './index.css';

const YouTubeVideo = ({ videoId, description }) => {
  // Construct the YouTube video URL
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-video">
        <div className="video-description">
        {description}
        </div>
        <div className="video-container">
            <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube Video"
            allowFullScreen
            ></iframe>
        </div>
    </div>
  );
};

export default YouTubeVideo;
