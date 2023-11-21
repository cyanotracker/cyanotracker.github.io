import React from 'react';
import './index.css';

const TextImageSection = ({ content }) => {
  return (
    <div className="text-image-section">
      {content.map((item, index) => (
        <div key={index} className={`row ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
          <div className="text-content">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
          {item.imageUrl && (
            <div className="image-content">
              <img src={".." + item.imageUrl} alt={item.title} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TextImageSection;
