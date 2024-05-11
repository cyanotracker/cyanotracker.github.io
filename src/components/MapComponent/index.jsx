import React,{useState} from 'react';
import './index.css'; // Import your CSS file for styling
import map1 from '../../assets/lake_pyramid.jpg';
import emailjs from 'emailjs-com';

import map4 from '../../assets/canadian_lakes.jpg';
import map5 from '../../assets/gandhisagar.jpg';
import map6 from '../../assets/uslakes_bloom.jpg';
const MapComponent = () => {
  const [selectedMap, setSelectedMap] = useState(null);

  const handleMapSelect = (map) => {
    setSelectedMap(map);
  };

  const [formData, setFormData] = useState({
    waterBody: '',
    coverageDate: '',
    requestorName: '',
    requestorEmail: '',
    requestorOrganization: '',
    comments: ''
  });

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
      await emailjs.send('service_4vfby48', 'template_50xiip9', {
        to_name: 'CyanoTracker', 
        email_from: formData.requestorEmail,
        waterBody: formData.waterBody,
        coverageDate: formData.coverageDate,
        requestorName: formData.requestorName,
        requestorEmail:formData.requestorEmail,
        requestorOrganization: formData.requestorOrganization,
        comments: formData.comments
        // message: `
        //   Name of Water body (with state and country): ${formData.waterBody}
        //   Coverage Date: ${formData.coverageDate}
        //   Name of requestor: ${formData.requestorName}
        //   Email of requestor: ${formData.requestorEmail}
        //   Organization of requestor: ${formData.requestorOrganization}
        //   Miscellaneous comments: ${formData.comments}
        // `
      }, 'a1whV3G1MFF03V7Gg');
      alert('We have received your request. Please allow up to 48 business hours for us to reach out to you with the CyanoHAB requested map.');
      // Reset form data
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
  return (
    <>
    <h1 id="request-map-heading">CyanoMap Archive</h1>
    <div className="map-container" style={{marginTop:'20px'}}>
     
      <div className="map-section">
        <div className='map-box' onClick={() => handleMapSelect(map1)}>
        <img src={map1} alt="Map Image" />
        <div className="map-caption">Spatial progression of an ongoing CyanoHAB in Lake Pyramid</div>
        </div>

        <div className='map-box'>
        <img src="wisconsin.jpg" alt="Map Image" />
        <div className="map-caption">CyanoHABs in several Wisconsin lakes</div>
        </div>
        <div className='map-box'>
        <img src="lake_upper_klamath.jpg" alt="Map Image" />
        <div className="map-caption">A massive CyanoHAB in Lake Upper Klamath</div>
        </div>
        <div className='map-box'>
        <img src={map4} alt="Map Image" />
        <div className="map-caption">Ongoing CyanoHABs in several Canadian lakes</div>
        </div>
        <div className='map-box'>
        <img src={map5} alt="Map Image" />
        <div className="map-caption">A putrid CyanoHAB in Lake Ghandhisagar, in India</div>
        </div>
        <div className='map-box'>
        <img src={map6} alt="Map Image" />
        <div className="map-caption">Massive CyanoHABs in several US lakes</div>
        </div>
      </div>
      {/* serviceid: service_4vfby48
        template-id: template_50xiip9
        a1whV3G1MFF03V7Gg
      
      */}

      {/* Request Form Section */}
      <div className="request-form-section">
      <h2>Request Form</h2>
        <div class="form-text">
        You can fill out this form to request a CyanoHAB map for a lake of your interest. We typically use Sentinel-2 MSI imagery due to its high spatial resolution (10m) and produce Normalized Difference Chlorophyll Index (NDCI) maps. NDCI is a direct indicator of Chl-a contect, which is highly correlated with Cyanobacterial Cell Density (CCD).

We also plan to produce CCD maps, as well as Phycocyanin concentration maps in the near future. Very soon, we will be producing multi-sensor maps, using satellite data from Sentinel-2/3; Landsat-8/9; PACE and GOES 16/17 satellite series.
        </div>


          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="waterBody">Name of Water body (with state and country)*</label>
              <input type="text" id="waterBody" name="waterBody" required onChange={handleChange} />
              <span class="info-icon">&#9432;</span>
              <p class="info-label">Enter waterbody name, state and country accurately</p>
            </div>
            <div className="form-group">
              <label htmlFor="coverageDate">Coverage Date*</label>
              <input type="date" id="coverageDate" name="coverageDate" required onChange={handleChange} />
              <span class="info-icon">&#9432;</span>
              <p className='info-label'>Enter the date of which you are requesting a satellite map. Please note - if cloud free satellite imagery of this date is not available, we will use cloud-free image closest to the requested date.</p>
            </div>
            <div className="form-group">
              <label htmlFor="requestorName">Name of requestor*</label>
              <input type="text" id="requestorName" name="requestorName" required onChange={handleChange} />
              <span class="info-icon">&#9432;</span>
              <p className='info-label'>Enter your full name</p>
            </div>
            <div className="form-group">
              <label htmlFor="requestorEmail">Email of requestor*</label>
              <input type="email" id="requestorEmail" name="requestorEmail" required onChange={handleChange} />
              <span class="info-icon">&#9432;</span>
              <p className='info-label'>Enter a valid email. We will share the satellite maps to this email.</p>
            </div>
            <div className="form-group">
              <label htmlFor="requestorOrganization">Organization of requestor*</label>
              <input type="text" id="requestorOrganization" name="requestorOrganization" required onChange={handleChange} />
              <span class="info-icon">&#9432;</span>
              <p className='info-label'>Current affiliation</p>
            </div>
            <div className="form-group">
              <label htmlFor="comments">Miscellaneous comments:</label>
              <textarea id="comments" name="comments" onChange={handleChange} />
              <span class="info-icon">&#9432;</span>
              <p className='info-label'>Any suggestions/feedback you may have on our work, or any other miscellaneous comments.</p>
            </div>
            <button type="submit">Submit Request</button>
          </form>
        </div>
    </div>
    </>
  );
}

export default MapComponent;
