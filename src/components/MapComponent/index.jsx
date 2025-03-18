import { createClient } from '@supabase/supabase-js';
import emailjs from 'emailjs-com';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';
import map4 from '../../assets/canadian_lakes.jpg';
import map5 from '../../assets/gandhisagar.jpg';
import map1 from '../../assets/lake_pyramid.jpg';
import map6 from '../../assets/uslakes_bloom.jpg';
import './index.css';

const SUPABASE_URL = 'https://qayclaepxapjwqfwpnzm.supabase.co';
const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);



const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [formData, setFormData] = useState({
    waterBody: '',
    coverageDate: '',
    requestorName: '',
    requestorEmail: '',
    requestorOrganization: '',
    comments: ''
  });
  const [selectedMap, setSelectedMap] = useState(null);

  const handleMapSelect = (map) => {
    setSelectedMap(map);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*');
      if (error) throw error;
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchCoordinates = async (locationInput) => {
    try {
      // Encode the locationInput and make a fetch request to Nominatim API
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`);
      const data = await response.json();
  
      // Check if any data was returned
      if (data.length > 0) {
        // Extract and return the coordinates
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      } else {
        console.error('No coordinates found for the given location.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const locationInput = formData.waterBody; // Capture the location input from the form
      const coordinates = await fetchCoordinates(locationInput);
      if (coordinates) {
        const [latitude, longitude] = coordinates;
        const existingLocation = locations.find(loc => loc.latitude === latitude && loc.longitude === longitude);
  
        if (existingLocation) {
          const updatedFrequency = existingLocation.frequency + 1;
          await updateLocationFrequency(existingLocation.id, updatedFrequency);
          setLocations(locations.map(loc => loc.latitude === latitude && loc.longitude === longitude ? { ...loc, frequency: updatedFrequency } : loc));
        } else {
          const newLocation = {
            location: locationInput, // Ensure this is correctly set to the input value
            frequency: 1,
            latitude: latitude,
            longitude: longitude,
          };
          await insertLocation(newLocation); // Now insert the location with the correct name
          setLocations([...locations, newLocation]);
        }
  
        alert('Location added/updated successfully!');
      } else {
        alert('Error: Unable to fetch coordinates.');
      }

      await emailjs.send('service_4vfby48', 'template_50xiip9', {
        to_name: 'CyanoTracker',
        email_from: formData.requestorEmail,
        waterBody: formData.waterBody,
        coverageDate: formData.coverageDate,
        requestorName: formData.requestorName,
        requestorEmail: formData.requestorEmail,
        requestorOrganization: formData.requestorOrganization,
        comments: formData.comments,
      }, 'a1whV3G1MFF03V7Gg');
      alert('We have received your request. Please allow up to 48 business hours for us to reach out to you with the CyanoHAB requested map.');

     
      setFormData({
        waterBody: '',
        coverageDate: '',
        requestorName: '',
        requestorEmail: '',
        requestorOrganization: '',
        comments: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const insertLocation = async (location) => {
    const { data, error } = await supabase
      .from('locations')
      .insert([
        {
          location: formData.waterBody,
          latitude: location.latitude,
          longitude: location.longitude,
          frequency: 1, // Assuming initial frequency is 1
          // Do not include `id` here if it's auto-incrementing
        },
      ]);
  
    if (error) {
      console.error('Error inserting location:', error);
      throw error; // Rethrow error to be caught later
    }
  
    return data;
  };


  const updateLocationFrequency = async (locationId, frequency) => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .update({ frequency })
        .eq('id', locationId);
      if (error) throw error;
    } catch (error) {
      console.error('Error updating location frequency:', error);
    }
  };

  // const updateLocationFrequency = async (id) => {
  //   const { data, error } = await supabase
  //     .from('locations')
  //     .update({ frequency: supabase.raw('frequency + 1') }) // Increment frequency by 1
  //     .match({ id }); // Match by existing id
  
  //   if (error) {
  //     console.error('Error updating location frequency:', error);
  //     throw error; // Rethrow error to be caught later
  //   }
  
  //   return data;
  // };
  

  useEffect(() => {
    console.log("Locations updated:", locations);
  }, [locations]);

  const calculateCircleRadius = (frequency) => {
    return Math.sqrt(frequency) * 15000;
  };

  return (
    <>
    <h1 id="request-map-heading">CyanoMap Archive</h1>
      
    <div className='container'>
      
      {/* Static Map Images Section */}

      <div className="map-container">
      <div className="map-section">
        
        <div className='map-box' onClick={() => handleMapSelect(map1)}>
        <img src={map1} alt="Map 1" />
        <div className="map-caption">Spatial progression of an ongoing CyanoHAB in Lake Pyramid</div>
        </div>

        <div className='map-box'>
        <img src="wisconsin.jpg" alt="Map 2" />
        <div className="map-caption">CyanoHABs in several Wisconsin lakes</div>
        </div>
        <div className='map-box'>
        <img src="lake_upper_klamath.jpg" alt="Map 3" />
        <div className="map-caption">A massive CyanoHAB in Lake Upper Klamath</div>
        </div>
        <div className='map-box'>
        <img src={map4} alt="Map 4" />
        <div className="map-caption">Ongoing CyanoHABs in several Canadian lakes</div>
        </div>
        <div className='map-box'>
        <img src={map5} alt="Map 5" />
        <div className="map-caption">A putrid CyanoHAB in Lake Ghandhisagar, in India</div>
        </div>
        <div className='map-box'>
        <img src={map6} alt="Map 6" />
        <div className="map-caption">Massive CyanoHABs in several US lakes</div>
        </div>
      </div>
      {  /* Request Map Section  */}
    <div className="request-form-section">
          <h2>Request Form</h2>
          <div className="form-text">
          You can fill out this form to request a CyanoHAB map for a lake of your interest. We typically use Sentinel-2 MSI imagery due to its high spatial resolution (10m) and produce Normalized Difference Chlorophyll Index (NDCI) maps. NDCI is a direct indicator of Chl-a contect, which is highly correlated with Cyanobacterial Cell Density (CCD).

We also plan to produce CCD maps, as well as Phycocyanin concentration maps in the near future. Very soon, we will be producing multi-sensor maps, using satellite data from Sentinel-2/3; Landsat-8/9; PACE and GOES 16/17 satellite series.

          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="waterBody">Name of Water body (with state and country)*</label>
              <input type="text" id="waterBody" name="waterBody" value={formData.waterBody} required onChange={handleChange}  />
              <span className="info-icon">&#9432;</span>
              <p className="info-label">Enter waterbody name, state, and country accurately</p>
            </div>
            <div className="form-group">
              <label htmlFor="coverageDate">Coverage Date*</label>
              <input type="date" id="coverageDate" name="coverageDate" value={formData.coverageDate} required onChange={handleChange} />
              <span className="info-icon">&#9432;</span>
              <p className='info-label'>Enter the date of which you are requesting a satellite map...</p>
            </div>
            <div className="form-group">
              <label htmlFor="requestorName">Name of requestor*</label>
              <input type="text" id="requestorName" name="requestorName" value={formData.requestorName} required onChange={handleChange} />
              <span className="info-icon">&#9432;</span>
              <p className='info-label'>Enter your full name</p>
            </div>
            <div className="form-group">
              <label htmlFor="requestorEmail">Email of requestor*</label>
              <input type="email" id="requestorEmail" name="requestorEmail" value={formData.requestorEmail} required onChange={handleChange} />
              <span className="info-icon">&#9432;</span>
              <p className='info-label'>Enter a valid email...</p>
            </div>
            <div className="form-group">
              <label htmlFor="requestorOrganization">Organization of requestor*</label>
              <input type="text" id="requestorOrganization" name="requestorOrganization" value={formData.requestorOrganization} required onChange={handleChange} />
              <span className="info-icon">&#9432;</span>
              <p className='info-label'>Current affiliation</p>
            </div>
            <div className="form-group">
              <label htmlFor="comments">Miscellaneous comments:</label>
              <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} />
              <span className="info-icon">&#9432;</span>
              <p className='info-label'>Any suggestions/feedback you may have...</p>
            </div>
            <button type="submit">Submit Request</button>
            <div className='note-text'>
            We actively post latest NDCI maps derived from Landsat-8/9, Sentinel-2/3 for publicly active inland waterbodies throughout the US, on social media platforms such as
            <a href="https://twitter.com/cyanotracker"> Twitter</a>, <a href="https://www.facebook.com/cyanotracker/">Facebook </a> and 
            <a href="https://www.linkedin.com/in/cyano-tracker-992002140/"> LinkedIn.  </a>
            Apart from NDCI maps, we also follow the most recent advisories and alerts potential toxic activity due CyanoHABs for inland lakes within the US, in an attempt to disseminate crucial information to public.
             To provide feedback on our work, or just to get in touch with us, you can drop an email at cyanotracker@gmail.com.
            </div>
          </form>
        </div>

      </div>

 


      
      {/* Dynamic World Map Section */}
      <div id='map-section'>
      <h3 id="map-heading">HAB Map Requests Serviced Globally</h3>


      <div className="world-map-container" style={{ marginTop: '20px' }}>
        <MapContainer center={[40, 0]} zoom={3} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

        {console.log('Locations',locations)}

        {locations.map(({ id, location, frequency, latitude, longitude }) => (
            latitude && longitude && (
              <Circle
                key={id}
                center={[latitude, longitude]}
                radius={calculateCircleRadius(frequency)}
                color="red"
                fillColor="red"
                fillOpacity={0.5} // Range 0 to 1.
              >
                <Popup>
                  {location}, requests:{frequency}
                </Popup>
              </Circle>
            )
          ))}
        </MapContainer>
        </div>


        </div>
        </div>
      
    
    </>
  );
};

export default MapComponent;