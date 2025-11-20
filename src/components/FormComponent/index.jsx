import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import emailjs from 'emailjs-com';
import React, { useRef, useState } from 'react';
import './index.css';
const SUPABASE_URL = 'https://qayclaepxapjwqfwpnzm.supabase.co';
const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const FormComponent = () => {
  const [images, setImages] = useState([]);
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '', city: '', address: '' });
  const autoCompleteRef = useRef(null);

  const handleAddressChange = (address) => {
    setUserLocation({ ...userLocation, address });
  };

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    bloomDate: '',
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMMM do yyyy');
    } catch (error) {
      console.error('Invalid date:', error);
      return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'latitude' || name === 'longitude') {
      setUserLocation((prevLocation) => ({
        ...prevLocation,
        [name]: value
      }));
    }
  };

  const resizeImage = async (file) => {
    if (file.size < 10240) return file; // Skip resizing for images under 10KB
  
    const img = new Image();
    img.src = URL.createObjectURL(file);
  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const scale = Math.sqrt(5120 / file.size);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
  
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              reject(new Error('Image resizing failed. Blob generation unsuccessful.'));
            }
          }, 'image/jpeg', 0.8);
        } catch (error) {
          console.error('Error during image resizing:', error);
          reject(new Error('Image resizing encountered an unexpected error.'));
        }
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image for resizing.'));
      };
    });
  };
  
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const resizedImages = await Promise.all(
        files.map((file) =>
          resizeImage(file).catch((error) => {
            console.error(`Error resizing ${file.name}:`, error.message);
            alert(`Failed to resize ${file.name}. It may not be uploaded.`);
            return null;
          })
        )
      );
      setImages(resizedImages.filter(Boolean)); // Filter out any failed resizes
    } catch (error) {
      console.error('Error during image processing:', error);
      alert('An unexpected error occurred while processing images. Please try again.');
    }
  };
  

  const uploadImages = async () => {
    const imageUrls = [];

    for (const image of images) {
      const sanitizedFileName = image.name.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
      try {
        const { data, error } = await supabase.storage
          .from('Image_upload')
          .upload(`images/${sanitizedFileName}`, image);

        if (error) {
          alert(`Image upload failed for ${image.name}! Error: ${error.message}`);
          return [];
        } else {
          const publicURL = `${SUPABASE_URL}/storage/v1/object/public/Image_upload/images/${sanitizedFileName}`;
          if (publicURL) imageUrls.push(publicURL);
        }
      } catch (uploadError) {
        alert(`Unexpected error occurred while uploading ${image.name}. Please try again later.`);
        return [];
      }
    }
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await uploadImages();
      const formattedImageUrls = imageUrls.join(', ');

      await emailjs.send('service_4vfby48', 'template_0yg505d', {
        to_name: 'CyanoTracker',
        email_from: formData.email,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        user_email: formData.email,
        address: formData.address,
        bloomDate: formatDate(formData.bloomDate) || 'No date provided',
        images: formattedImageUrls,
        subject: `Report a Bloom Request from ${formData.email} - [Website Request]`  // Website Subject Line..
      }, 'a1whV3G1MFF03V7Gg');

      alert('Form Submitted Successfully!');
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        bloomDate: ''
      });
      setImages([]);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <h2 id="report-bloom-heading">Report a Bloom Form</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter Name * 
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label htmlFor="phoneNumber">Enter Phone Number 
            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
          <label htmlFor="email">Enter Email id *
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label htmlFor="address">Enter Location/Waterbody where Bloom was observed *
            <input type="text" id="address" name="address" value={userLocation.address}
              onChange={(e) => { handleAddressChange(e.target.value); handleChange(e); }} required />
          </label>
          <label htmlFor="bloomDate">Enter Date when Bloom was observed
            <input type="date" id="bloomDate" name="bloomDate" onChange={handleChange} />
          </label>
          <label htmlFor="images">Upload Images: 
            <input type="file" id="images" name="images" accept="image/*" multiple onChange={handleImageChange} /> 
          </label>
          <button id="form-submit" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default FormComponent;
