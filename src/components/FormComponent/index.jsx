import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import emailjs from 'emailjs-com';
import { format } from 'date-fns';
const FormComponent = () => {
  const [images, setImages] = useState([]);
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '', city: '', address: '' });
  const autoCompleteRef = useRef(null);

  // useEffect(() => {
  //   const getLocation = async () => {
  //     try {
  //       if ('geolocation' in navigator) {
  //         navigator.geolocation.getCurrentPosition(
  //           async (position) => {
  //             const { latitude, longitude } = position.coords;
  //             setUserLocation({ latitude, longitude });
  //             fetchLocationCity(latitude, longitude);
  //           },
  //           (error) => {
  //             console.error('Error fetching location:', error.message);
  //           }
  //         );
  //       } else {
  //         console.error('Geolocation is not supported by this browser.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching location:', error.message);
  //     }
  //   };

  //   getLocation();
  // }, []);

  // const fetchLocationCity = async (latitude, longitude) => {
  //   try {
  //     const apiKey = '585c52d7644c7ac51c29b2dd22d49b58';
  //     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
  //     const city = response.data.name;
  //     setUserLocation((prevLocation) => ({ ...prevLocation, city }));
  //   } catch (error) {
  //     console.error('Error fetching city:', error.message);
  //   }
  // };

  const handleAddressChange = (address) => {
    setUserLocation({ ...userLocation, address });
  };

  // const handleSelect = async (address) => {
  //   try {
  //     const results = await geocodeByAddress(address);
  //     const latLng = await getLatLng(results[0]);
  //     setUserLocation({
  //       ...userLocation,
  //       address,
  //       latitude: latLng.lat,
  //       longitude: latLng.lng,
  //     });
  //   } catch (error) {
  //     console.error('Error selecting address:', error.message);
  //   }
  // };

  const [formData, setFormData] = useState({
    name:'',
    phoneNumber:'',
    email:'',
    address:'',
    bloomDate:'',
  });


  const formatDate = (dateString) => {
    if (!dateString) {
      return ''; // or return a default value or an error message
    }
  
    try {
      return format(new Date(dateString), 'MMMM do yyyy');
    } catch (error) {
      console.error('Invalid date:', error);
      return ''; // or return a default value or an error message
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('handleChange:', name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Update latitude and longitude if available
    if (name === 'latitude' || name === 'longitude') {
      console.log('Updating location:', name, value);
      setUserLocation((prevLocation) => ({
        ...prevLocation,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  
    try {
      const toEmails = 'ak0801288017@gmail.com,chintanmaniyar.iitb@gmail.com'; 
      await emailjs.send('service_4vfby48', 'template_0yg505d', {
        to_name: 'CyanoTracker',
        to_email: toEmails,
        email_from: formData.email,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        user_email: formData.email,
        address: formData.address,
        bloomDate: formatDate(formData.bloomDate) || 'No date provided' // Handle the case where bloomDate is empty or invalid
       
      }, 'a1whV3G1MFF03V7Gg');
  
      alert('Form Submitted Successfully!');
      // Reset form data
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        bloomDate: ''
    
  
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  // useEffect(() => {
  //   const autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, { types: ['address'] });
  //   autoComplete.addListener('place_changed', () => {
  //     const place = autoComplete.getPlace();
  //     handleSelect(place.formatted_address);
  //   });
  // }, []);

  return (
    <>
      <h2 id="report-bloom-heading">Report a Bloom Form</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter Name * <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}  required />
          </label>
          
          <label htmlFor="phoneNumber">Enter Phone Number <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /></label>
          
          <label htmlFor="email">Enter Email id *<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /></label>
          
          <label htmlFor="address"> Enter Location/Waterbody where Bloom was observed *<input
            type="text"
            id="address"
            name="address"
            value={userLocation.address}
            onChange={(e) => {
              handleAddressChange(e.target.value);
              handleChange(e);
            }}
           
            required
          /></label>
          <label for="blooomDate">Enter Date when Bloom was observed</label>
          <input type="date" id="bloomDate" name="bloomDate" onChange={handleChange} />
          <button id="form-submit" type="submit">Submit</button>
        </form>


    
      </div>
    </>
  );
};

export default FormComponent;
