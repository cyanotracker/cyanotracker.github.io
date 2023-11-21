import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoSection from './components/VideoSection';
import TextImageSection from './components/TextImageSection';
import src from './assets/algae2.mp4';
import imgurl1 from './assets/img3.jpeg';
import imgurl2 from './assets/img2.jpg';
import Footer from './components/Footer';
import YouTubeVideo from './components/YouTubeVideo';
import './App.css';
// Assuming these are other components you might have
import Faq from './pages/Faq.jsx';


function MainContent() {
  const contents = [
    {
      title: "Project Overview",
      text: "The dazzling and innocuous colors of cyanobacteria blooms don't fully reveal just how toxic they can be. Sometimes, a full scale problem may not be visually noticeable. Floods and extreme farm run-off can lead to an explosive growth of toxic cyanobacteria, forming a blanket of scum that prevents light to reach the plants beneath the water surface and degrading aquatic habitats coinciding with massive fish kills, bringing about both environmental and economic damage.(image source: Dr.Susan Wilde)",
      imageUrl: imgurl2
    },
    {
      title: "Our Approach",
      text: "Targeted monitoring of these events from our deployable instrumentation is indispensable to the quality of Georgia's inland waters. Accurate, cost-effective and targeted monitoring of these events is pivotal as the frequency and magnitude of harmful algal blooms have grown, particularly in summer months due to the combination of high temperatures, run-off and drought. The group of researchers from Department of Computer Science and Department of Geography at The University of Georgia, Athens plan to use CyanoTRACKER and encourage the community to provide their observations regarding the quality of their lakes by sending trustworthy, actionable information via online social media platforms such as Facebook and twitter.",
      imageUrl: imgurl1
    },
    // Add more content objects as needed
  ];

  return (
    <>
      <VideoSection videoSrc={src} overlayText={<><h1>CyanoTRACKER</h1><h3>CyanoTRACKER will address a significant environmental issue important to Georgia inland waters, namely, harmful algal blooms or popularly referred as toxic algae.</h3></>}></VideoSection>
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
