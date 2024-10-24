import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome for icons
import './index.css'; // Add CSS for styling the lightbox
import { useEffect } from 'react';

const CustomLightbox = ({ image, onClose, onMoveNext, onMovePrev, caption }) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    // Handler function for keyboard events
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          onMovePrev(); // Move to the previous image
          break;
        case 'ArrowRight':
          onMoveNext(); // Move to the next image
          break;
        case 'Escape':
          onClose(); // Close the lightbox
          break;
        default:
          break;
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMoveNext, onMovePrev, onClose]);

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.2, 3));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1));

  return ReactDOM.createPortal(
    <div className="custom-lightbox-overlay">
      <div className="custom-lightbox-content">
        <img
          src={image.src}
          alt={caption}
          className="custom-lightbox-image"
          style={{ transform: `scale(${zoom})` }}
        />
        <div className="custom-lightbox-caption">{caption}</div>
        <button className="custom-lightbox-prev" onClick={onMovePrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="custom-lightbox-next" onClick={onMoveNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <button className="custom-lightbox-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <button className="custom-lightbox-zoom-in" onClick={handleZoomIn}>
          <i className="fas fa-search-plus"></i>
        </button>
        <button className="custom-lightbox-zoom-out" onClick={handleZoomOut}>
          <i className="fas fa-search-minus"></i>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CustomLightbox;
