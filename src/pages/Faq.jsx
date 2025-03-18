import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Accordion from '../components/Accordian';

const Faq = () => {
  const [faqs, setFaqs] = useState([]); // State to hold the fetched FAQs
  const [expandedCardId, setExpandedCardId] = useState(null); // Track expanded card by its ID
  const [hoveredImageId, setHoveredImageId] = useState(null); // Track hovered image

  useEffect(() => {
    // Fetch the JSON file containing FAQs data
    fetch('https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/FAQ/images.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setFaqs(data))
      .catch((error) => console.error('Error fetching FAQs:', error));
  }, []);

  const handleCardClick = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id)); // Toggle the clicked card
  };

  const handleImageHover = (id) => {
    setHoveredImageId(id); // Set the hovered image id
  };

  return (
    <>
    <div>
      <div id="faq-title" style={{ marginTop:'130px' }}>
        <h2 style={{ fontSize: '35px' }}>Frequently Asked Questions</h2>
      </div>
      <div className="faq-grid-container">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`faq-card-wrapper ${expandedCardId === faq.id ? 'expanded' : ''}`}
          >
            <div
              className={`faq-card ${expandedCardId === faq.id ? 'expanded' : ''}`}
              onClick={() => handleCardClick(faq.id)}
            >
              <div
                className="faq-card-image-wrapper"
                onMouseEnter={() => handleImageHover(faq.id)} 
                onMouseLeave={() => handleImageHover(null)}  
                onTouchStart={() => handleImageHover(faq.id)} 
                onTouchEnd={() => handleImageHover(null)}  
              >
                <img
                  src={faq.image}
                  alt={faq.title}
                  className="faq-card-image"
                />
                {hoveredImageId === faq.id && (
                  <div className="faq-image-caption">
                    {faq.caption}
                  </div>
                )}
              </div>
              <div className="faq-card-header">
                <h3 className="faq-card-title">{faq.title}</h3>
              </div>
            </div>

            {expandedCardId === faq.id && (
              <div className="faq-card-content">{faq.content}</div>
            )}
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default Faq;
