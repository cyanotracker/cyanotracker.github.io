import React from "react";
import "./index.css";

const PublicationCard = ({ title, authors, journal, year, volume = "", link, image, type,caption }) => {
  let content;

  if (type === "media-highlights") {
    content = (
      
      <div className="media-item">
        <a href={link} target="_blank" className="media-link" rel="noopener noreferrer">
          <img src={image} alt={title} className="media-logo" />
          
          <p className="media-year">{year}</p>
          <p className="media-caption">{caption} &nbsp; </p>
        
        </a>
      </div>
    );
  } else {
    let color;
    switch (type) {
      case "journal":
        color = "#8FC1DA"; // skyblue
        break;
      case "conference-proceedings":
        color = "#E0AED0"; // light purple
        break;
      case "conference-presentations":
        color = "#FEFFAC"; // yellow
        break;
      default:
        color = "#fff"; 
        break;
    }

    content = (
      <div className="publications-card" style={{ borderLeft: `10px solid ${color}` }}>
        <div className="publication-info">
          {image && <img src={image} alt="Publication" className="publication-image" />}
          <div className="publication-content">
            <h3 className="publications-title">{title}</h3>
            <p className="authors">{authors}</p>
            <p className="journal">{journal}</p>
            {volume && <p className="volume">Volume: {volume}</p>}
            <a href={link} target="_blank" rel="noopener noreferrer" className="publications-link">Read Publication</a>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default PublicationCard;
