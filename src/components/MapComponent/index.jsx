import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MapComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD-f7c_BDBIA0d4SdazCUNQPzd0yYdLmic" // Replace with your API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Your map code here */}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;
