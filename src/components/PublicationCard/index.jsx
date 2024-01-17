import React from "react";
import './index.css';


const PublicationCard = ({ title, authors, journal, year, volume, link }) => {
    return (
      <>
        <div class="card">
          <h3 class="title">{title}</h3>
          <p class="authors">{authors}</p>
          <p classs="journal">{journal}, {year}</p>
          <p class="volume">Volume: {volume}</p>
          <a href={link} target="_blank" rel="noopener noreferrer" class="link">Read Publication</a>
        </div>
      </>
    );
  };

  export default PublicationCard;