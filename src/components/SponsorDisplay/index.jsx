import React from 'react';
import './index.css'; // Ensure you have the CSS file for styling

const SponsorDisplay = ({ sponsors }) => {
  return (
    <div className="sponsor-display">
      {sponsors.map((sponsor, index) => (
        <div key={index} className="sponsor">
          <div className="sponsor-header">
            <img src={sponsor.logoUrl} alt={sponsor.name} className="sponsor-logo" />
            <h3 className="sponsor-name">{sponsor.name}</h3>
          </div>
          {sponsor.programs.map((program, progIndex) => (
            <p key={progIndex} className="sponsor-program">
              {program.name} (Award #{program.awardNumber})
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SponsorDisplay;
