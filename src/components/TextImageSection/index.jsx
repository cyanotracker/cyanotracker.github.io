import React from 'react';
import './index.css';

const TextImageSection = ({ content }) => {
  return (
    <div className="text-image-section">
      {content.map((item, index) => (
        <div key={index} className={`row ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
          <div className="text-content">
            <h2>{item.title}</h2>
            <p>
              {item.text}
              {/* Inline URL with the text */}
              {item.url && 
                <span> 
                  {' '} 
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.urlText || 'Learn More'}
                  </a>
                </span>
              }
            </p>
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
