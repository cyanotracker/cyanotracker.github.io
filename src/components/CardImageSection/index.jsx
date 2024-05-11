import React, { useState } from 'react';
import './index.css';

const CardImageSection = ({ heading, sections }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div className="CardImageOuter-container">
        <h1 className="mainHeading">{heading}</h1>
        {sections.map((section, index) => (
          <div key={index} className="section">
            <div className={`textContainer ${section.imagePlacement === 'right' ? 'textContainer-right' : ''}`}>
              {section.cards.map((card, cardIndex) => (
                <div key={cardIndex} className="cyano_card" id={`card${cardIndex + 1}`}>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            <div className="imageSection">
              <img
                src={section.image}
                alt={`${heading} - Image ${index + 1}`}
                className="image"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {hoveredIndex === index && (
                <div className="imageCredit">
                  Image credit: Raviprakash, Maniyar & Mishra, 2023; @UGA
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardImageSection;
