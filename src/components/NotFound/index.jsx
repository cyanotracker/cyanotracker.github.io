import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import notFoundGraphic from '../../assets/404.png';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">

      {/* Background glow */}
      <div className="bg-glow"></div>

      {/* Image container */}
      <div className="image-wrapper">
        <img
          src={notFoundGraphic}
          alt="404 Page Not Found"
          className="notfound-graphic"
        />
        <div className="image-fade"></div>
      </div>

      <button
        className="notfound-home-btn"
        onClick={() => navigate('/')}
      >
        Go Back Home
      </button>

    </div>
  );
}