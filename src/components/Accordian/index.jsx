import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styles

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        
        <div className="accordion">
            <div 
                className="accordion-header" 
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
            </div>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
        </>
    );
};

export default Accordion;
