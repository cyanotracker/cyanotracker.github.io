import React, { useState } from 'react';
import './index.css';

const TextImageSection = ({ content }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="text-image-section">
       <div className="scroll-wrapper">
      {[...content, ...content].map((item, index) => (
        <div
          key={index}
          className={`row ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="text-content">
            <h2>{item.title}</h2>
            <p>
              {item.text}
              {item.url && (
                <span>
                  {' '}
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.urlText || 'Learn More'}
                  </a>
                </span>
              )}
            </p>
          </div>
          {item.imageUrl && (
            <div className="image-content">
              <img src={item.imageUrl} alt={item.title} />
              {hoveredIndex === index && (
                <div className="hover-text">
                  {index === 0
                    ? `Image credit: Environmental Working Group. Click `
                    : `Image credit: Boddula Ramaswamy & Mishra, 2017; doi: `}
                  <a
                    href={
                      index === 0
                        ? 'https://www.ewg.org/interactive-maps/2019_microcystin/map/'
                        : 'https://doi.org/10.1109/AIMS.2017.19'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit' }}
                  >
                    {index === 0 ? 'here' : 'https://doi.org/10.1109/AIMS.2017.19'}
                  </a>
                  {index === 0 ? ' for their interactive map.' : ''}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default TextImageSection;
