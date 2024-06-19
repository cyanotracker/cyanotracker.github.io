import React from 'react';
import CardImageSection from '../components/CardImageSection';
import cyano2 from '../assets/cyano_2.png';
import graph1 from '../assets/graph-1.png';
import graph2 from '../assets/graph-2.png';
import poster from '../assets/Poster.jpg';
import pic2 from '../assets/cyanosense_20_housing_design.png';
import pic3 from '../assets/cyanosense_20_rrs.png';
const Cyanosense2 = () => {
  const sections = [
    {
      image: cyano2,
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
      image: pic2,
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
      image: pic3,
      cards: [
        {
          title:'Efficient Data Transmission',
          description:"Spectrum readings are taken every 24 hours at 11am. The data is stored on the microcontroller where it will then be compressed into binary messages. Once compressed, the data will be sent through the Iridium satellites and then decompressed once it arrives at the lab.",
       },
       {
        title:'Cost Effective Solution',
        description:"    To save battery, the microcontroller can turn off the sensors using the photorelay, put the satellite modem to sleep, and can enter deep sleep itself. The overall sensor system costs around $1300 which is significantly cheaper than other industrial spectrometers which cost $4500 on average.",
      }
      ],
      imagePlacement: 'left', // Specify the image placement
    },
    // Add more sections as needed
   
  ];

    return (
    <div>
       
     
      <CardImageSection heading={<a href=" https://docs.google.com/presentation/d/e/2PACX-1vQ7LYzqtoA65Rp1M516fLmyI8xQlR8ftpOZuWrp7uqPEwtB9Ie4fMWnnkHTWbeRHw/pub?start=false&loop=true&delayms=3000" style={{color:"#fff",textDecoration: 'none'}} target='_blank' >CyanoSense 2.0 - Next Generation Cyanosense</a>}
     sections={sections} />
    </div>
  );
};

export default Cyanosense2;
