import React from "react";
import "./index.css";
import { AiFillFilePdf } from "react-icons/ai";

const PublicationCard = ({
  title,
  authors,
  journal,
  year,
  volume = "",
  link,
  image,
  type,
  caption,
  pdf
}) => {
  let content;

  if (type === "media-highlights") {
    content = (
      <div className="media-item">
        <a href={link} target="_blank" className="media-link" rel="noopener noreferrer">
          <img src={image} alt={title} className="media-logo" />
          <p className="media-year">{year}</p>
          <p className="media-caption">{caption} &nbsp;</p>
        </a>
      </div>
    );
  } else {
    let color;

    switch (type) {
      case "journal":
        color = "#8FC1DA";
        break;
      case "conference-proceedings":
        color = "#E0AED0";
        break;
      case "conference-presentations":
        color = "#FEFFAC";
        break;
      default:
        color = "#fff";
        break;
    }

    content = (
      <div className="publications-card" style={{ borderLeft: `10px solid ${color}` }}>
        <div className="publication-info">
          {image && (
            <img src={image} alt="Publication" className="publication-image" />
          )}

          <div className="publication-content">
            <h3 className="publications-title">{title}</h3>
            <p className="authors">{authors}</p>
            <p className="journal">{journal}</p>
            {volume && <p className="volume">Volume: {volume}</p>}

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="publications-link"
            >
              Read Publication
            </a>

            {/* PDF icon (dynamic) */}
            {pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                id="pdf-icon"
                download
                style={{ display: "inline-block", marginTop: "8px" }} // moves icon lower
              >
                <AiFillFilePdf size={38} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default PublicationCard;
