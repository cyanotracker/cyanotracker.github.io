import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoSection from './components/VideoSection';
import TextImageSection from './components/TextImageSection';
import src from './assets/algae2.mp4';
import imgurl1 from './assets/img1.jpg';
import imgurl2 from './assets/img2.jpg';
import Footer from './components/Footer';
import YouTubeVideo from './components/YouTubeVideo';
import './App.css';
import SponsorDisplay from './components/SponsorDisplay';
// Assuming these are other components you might have
import Faq from './pages/Faq.jsx';
import nsf from './assets/nsf.png';
import nasa from './assets/nasa.png';
function MainContent() {
  const contents = [
    {
      title: "Project Overview",
      text: "The dazzling and innocuous colors of cyanobacteria blooms do not fully reveal just how toxic they can be. Sometimes, a full-scale problem may not be visually noticeable. Droughts and extreme agricultural run-off can lead to an explosive growth of toxic cyanobacteria, forming a blanket of scum that prevents light from reaching deeper into the water column and degrading aquatic habitats, and creating low or depleted oxygen in a water body. The global proliferation of CyanoHABs have presented a major risk to the public and wildlife, and ecosystem and economic services provided by inland water resources (Image source: Dr.Susan Wilde, UGA)",
      imageUrl: imgurl2
    },
    {
      title: "Our Approach",
      text: "Accurate, cost-effective, and targeted monitoring of these events is pivotal as the frequency and magnitude of CyanoHABs have grown, particularly in the summer months. A group of researchers  from diverse disciplines at The University of Georgia, Athens, developed a framework called CyanoTRACKER that seamlessly integrates community observations (Social Cloud), remote sensing measurements (Sesnor Cloud), and advanced multimedia analytics (Computational Cloud) for effective CyanoHABs monitoring. All components of CyanoTRACKER provided important data related to CyanoHABs assessments in global inland water bodies. Reports and data received via the social cloud, including platforms such as  X (formerly Twitter), Facebook, and CyanoTRACKER website, help identify the geographic locations of CyanoHABs affected water bodies for tracking, mapping, and disseminating CyanoHABs information to the community. To learn more about the technical details, please refer:",
      url: "https://doi.org/10.1016/j.hal.2020.101828 ",
      imageUrl: imgurl1,

    },
    // Add more content objects as needed
  ];

  const sponsors = [
    {
      name: 'National Science Foundation (NSF)',
      logoUrl: nsf, // Replace with actual logo path
      programs: [
        { name: 'Cyber-Innovation for Sustainability Science and Engineering (CyberSEES)', awardNumber: '1442672' }
      ]
    },
    {
      name: 'National Aeronautics and Space Administration (NASA)',
      logoUrl: nasa, // Replace with actual logo path
      programs: [
        { name: 'Earth Science Research from Operational Geostationary Satellite Systems', awardNumber: '80NSSC23K1258' },
        { name: 'Future Investigators in NASA Earth and Space Science and Technology', awardNumber: '80NSSC24K0068' }
      ]
    }
  ];

  return (
    <>
      <VideoSection videoSrc={src} overlayText={<><h1>CyanoTRACKER</h1><h3>CyanoTRACKER employs a multi-cloud framework for early detection and dissemination of cyanobacterial harmful algal blooms (CyanoHABs) in inland waters worldwide</h3></>}></VideoSection>
      <h1 style={{paddingTop:'20px'}}>Project Sponsors</h1>
      <SponsorDisplay sponsors={sponsors} />
      <TextImageSection content={contents} />
      {/* <PlayOnScrollVideo videoSrc={src} overlayText="dkjcdhvdjvhb"></PlayOnScrollVideo> */}
      <h2>Watch the CyanoTRACKER Video</h2>
      <YouTubeVideo
        videoId="q-mtCnw6Yro"
        description="Watch the cyanotracker video below on how you can provide vital information during your next trip to the lake."
      />
      <Footer></Footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<MainContent />} />
        {/* <Route path="/about" element={<About/>} />
        <Route path="/cyanoHAB" element={<cyanoHAB/>} /> */}
        <Route path='/Faq' element={<Faq/>}/>
      </Routes>
    </Router>
  );
}

export default App;
