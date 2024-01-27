import React from 'react';
import './index.css';

const CardImageSection = ({ heading, sections }) => {
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
      <img src={section.image} alt={`${heading} - Image ${index + 1}`} className="image" />
    </div>
  </div>
))}

      </div>
    </>
  );
};

export default CardImageSection;
