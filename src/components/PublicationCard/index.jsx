import React from "react";
import './index.css';


const PublicationCard = ({ title, authors, journal, year, volume, link }) => {
    return (
      <>
        <div class="publications-card">
          <h3 class="publications-title">{title}</h3>
          <p class="authors">{authors}</p>
          <p class="journal">{journal}, {year}</p>
          <p class="volume">Volume: {volume}</p>
          <a href={link} target="_blank" rel="noopener noreferrer" class="publications-link">Read Publication</a>
        </div>
      </>
    );
  };

  export default PublicationCard;