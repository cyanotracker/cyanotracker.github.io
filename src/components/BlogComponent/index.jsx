import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from "react";
import CustomLightbox from '../CustomLightbox';
import "./index.css";

const BlogComponent = () => {
  const [images, setImages] = useState([]);
  const [galleryType, setGalleryType] = useState('cyano_gallery'); // default to team gallery
  const [index, setIndex] = useState(-1); // track currently selected image
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryData = async (url, galleryKey) => {
      try {
        const response = await fetch(url, {
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); 

        // Check if the correct gallery data exists
        if (data && Array.isArray(data[galleryKey])) {
          setImages(data[galleryKey].map(item => ({
            src: item.image,
            smallCaption: item['smallCaption'],
            bigCaption: item['bigCaption'],
          })));
        } else {
          throw new Error('Invalid JSON structure');
        }
      } catch (error) {
        setError(`Error fetching gallery data: ${error.message}`);
        console.error('Error fetching gallery data:', error);
      }
    };

    // Fetch data based on the selected gallery type and corresponding key
    const galleryUrls = {
      team_gallery: {
        url: 'https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/Field_Trip_Images/images.json',
        key: 'field_trip_gallery'
      },
      cyano_gallery: {
        url: 'https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/Cyano_Map_Images/images.json',
        key: 'cyano_map_gallery'
      }
    };

    const { url, key } = galleryUrls[galleryType];
    fetchGalleryData(url, key);

  }, [galleryType]); // refetch data when gallery type changes

  const handleClose = () => setIndex(-1);  // closes the lightbox
  const handleMoveNext = () => setIndex((index + 1) % images.length);
  const handleMovePrev = () => setIndex((index + images.length - 1) % images.length);

  const handleTabChange = (event, newValue) => {
    setGalleryType(newValue); // switch between team gallery and cyano gallery
  };

  return (
    <div className="cayno-blog-container">
      <h1 id="blog-heading">CyanoTRACKER Sneak Peeks</h1>
      
      <Tabs 
        value={galleryType} 
        onChange={handleTabChange} 
        className="MuiTabs-root css-yxfy8p-MuiTabs-root"
        centered
      >
        
        <Tab id="cyano_gallery" label="Cyano Map Gallery" value="cyano_gallery" />
        <Tab id="team_gallery" label="Team Pictures Gallery" value="team_gallery" />
      </Tabs>

      <div className="blog-gallery">
        {images.length > 0 ? (
          images.map((img, idx) => (
            <div
              key={idx}
              className="blog-item"
              onClick={() => setIndex(idx)}
              data-test-id="grid-gallery-item"
            >
              <div className="image-container-blog">
                <img
                  src={img.src}
                  alt={img.bigCaption}
                  data-testid="grid-gallery-item_thumbnail"
                  style={{ cursor: 'pointer' }}
                />
                <div className="small-caption">{img.smallCaption}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No images found</div>
        )}
      </div>

      {index >= 0 && (
        <CustomLightbox
          image={images[index]}  // passes the selected image to the lightbox
          onClose={handleClose}
          onMoveNext={handleMoveNext}
          onMovePrev={handleMovePrev}
          caption={images[index].bigCaption}
        />
      )}

      {error && <div>{error}</div>}
    </div>
  );
};

export default BlogComponent;
