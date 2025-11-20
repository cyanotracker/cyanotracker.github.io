import React, { useEffect, useState } from 'react';
import CardImageSection from '../components/CardImageSection';

const Cyanosense2 = () => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [captions, setCaptions] = useState({});
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchImages = async () => {
      const noCacheUrl = `https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/CyanoSense2.0_Images/images.json?timestamp=${new Date().getTime()}`;

      try {
        const response = await fetch(noCacheUrl, { method: 'GET', cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setImages(data.images);
        setCaptions(data.captions);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const sections = [
    {
      image: images.cyano2, // Use the key from the JSON file
      caption: captions.cyano2, // Fetch the caption dynamically
      cards: [
        {
          title: 'Accurate Detection',
          description: 'Cyanosense 2.0 offers an accurate method to detect CyanoHABs that is efficient, cost-effective, and dependable for users of the system.',
        },
        {
          title: 'Advanced Technology',
          description: 'The system can offer local CyanoHAB detection independently or in conjunction with satellites employing spectrometry techniques.',
        },
      ],
    },
    {
      image: images.cyanosenseHousingDesign,
      caption: captions.cyanosenseHousingDesign,
      cards: [
        {
          title: 'Future Development',
          description: 'In the future, Cyanosense 2.0 could be developed to detect more than just CyanoHABs. The envisioned development might involve the integration of advanced technologies or methodologies to enhance the system\'s detection range. Ultimately, this forward-looking approach opens doors for Cyanosense 2.0 to become a more versatile and comprehensive tool in environmental monitoring.',
        },
        {
          title: 'Housing Design',
          description: 'The waterproof housing is broken up into two parts, a sensor housing and electronics housing. The sensor housing contains two spectrometer sensors with 3D printed mounts and FOV adaptors. The wires to the sensors run through a 2ft long PVC pipe to the electronics housing. The electronics housing contains the microcontroller, photorelay, Iridium satellite modem, and battery.',
        },
      ],
      imagePlacement: 'right',
    },
    {
      image: images.cyanosenseRRS,
      caption: captions.cyanosenseRRS,
      cards: [
        {
          title: 'Efficient Data Transmission',
          description: 'Spectrum readings are taken every 24 hours at 11am. The data is stored on the microcontroller where it will then be compressed into binary messages. Once compressed, the data will be sent through the Iridium satellites and then decompressed once it arrives at the lab.',
        },
        {
          title: 'Cost Effective Solution',
          description: 'To save battery, the microcontroller can turn off the sensors using the photorelay, put the satellite modem to sleep, and can enter deep sleep itself. The overall sensor system costs around $1300 which is significantly cheaper than other industrial spectrometers which cost $4500 on average.',
        },
      ],
      imagePlacement: 'left',
    },
  ];

  return (
    <div>
    <CardImageSection
      heading={
        <a
          href="https://pubs.acs.org/doi/10.1021/acsestwater.5c00301"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '2.3rem',
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {    // Rose Pink Color: #E69A8DFF
            e.target.style.color = '#66d9ff';
            e.target.style.textShadow = '0 0 6px #00bfff';
            e.target.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#fff';
            e.target.style.textShadow = 'none';
            e.target.style.textDecoration = 'none';
          }}
        >
          CyanoSense 2.0 - Next Generation Cyanosense
        </a>
      }
      sections={sections}
    />
  </div>
  );
};

export default Cyanosense2;
