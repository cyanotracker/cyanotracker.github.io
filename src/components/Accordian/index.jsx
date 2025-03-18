import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styles

const Accordion = ({ index, title, image, content, isOpen, toggleOpen }) => {
    return (
      <div className={`faq-card ${isOpen ? "open" : ""}`}>
        <div className="faq-card-header" onClick={() => toggleOpen(index)}>
          <img src={image} alt={title} className="faq-card-image" />
          <h3 className="faq-card-title">{title}</h3>
          <div className="faq-card-toggle">{isOpen ? "-" : "+"}</div>
        </div>
        {isOpen && <div className="faq-card-content">{content}</div>}
      </div>
    );
  };
export default Accordion;
