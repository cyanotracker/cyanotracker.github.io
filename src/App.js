import React from 'react';
import { useState,useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoSection from './components/VideoSection';
import TextImageSection from './components/TextImageSection';
import src from './assets/algae2.mp4';
import imgurl1 from './assets/img1.jpg';
import imgurl2 from './assets/img2.jpg';
import ourapproach from './assets/our_approach.png'
import overview_img from './assets/project_overview.png';
import Footer from './components/Footer';
import YouTubeVideo from './components/YouTubeVideo';
import './App.css';
import SponsorDisplay from './components/SponsorDisplay';
import Faq from './pages/Faq.jsx';
import Reacttweet from './components/React-tweet';
import Publications from './pages/Publications.jsx';
import Cyanosense2 from "./pages/Cyanosense2.jsx";
import Teams from "./pages/Teams.jsx";
import Form from "./pages/Form.jsx";
import NewsFeed from './components/NewsFeed/index.jsx';
import MapComponent from './components/MapComponent';
function MainContent() {
  const [tweets, setTweets] = useState([]);
  const contents = [
    {
      title: "Project Overview",
      text: (
        <div id="project-overview-container">
          
          <div id="text-content">
          <p>
            The dazzling and innocuous colors of cyanobacteria blooms do not fully reveal just how toxic they can be. Sometimes, a full-scale problem may not be visually noticeable. Droughts and extreme agricultural run-off can lead to an explosive growth of toxic cyanobacteria, forming a blanket of scum that prevents light from reaching deeper into the water column and degrading aquatic habitats, and creating low or depleted oxygen in a water body. The global proliferation of CyanoHABs have presented a major risk to the public and wildlife, and ecosystem and economic services provided by inland water resources.
          </p>
          </div>
          <div id="video">
          <YouTubeVideo videoId="q-mtCnw6Yro" />
          </div>
        </div>
      ),
    },
    {
      title: "Our Approach",
      text: "Accurate, cost-effective, and targeted monitoring of these events is pivotal as the frequency and magnitude of CyanoHABs have grown, particularly in the summer months. A group of researchers from diverse disciplines at The University of Georgia, Athens, developed a framework called CyanoTRACKER that seamlessly integrates community observations (Social Cloud), remote sensing measurements (Sensor Cloud), and advanced multimedia analytics (Computational Cloud) for effective CyanoHABs monitoring. All components of CyanoTRACKER provided important data related to CyanoHABs assessments in global inland water bodies. Reports and data received via the social cloud, including platforms such as X (formerly Twitter), Facebook, and CyanoTRACKER website, help identify the geographic locations of CyanoHABs affected water bodies for tracking, mapping, and disseminating CyanoHABs information to the community. To learn more about the technical details, please refer:",
      url: "https://doi.org/10.1016/j.hal.2020.101828",
      imageUrl: ourapproach,
    },
    // Add more content objects as needed
  ];

  const [forceRerender, setForceRerender] = useState(false);

useEffect(() => {
  const fetchTweets = () => {
    fetch(`https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/cyano_tweet_ids.txt?${new Date().getTime()}`, {
      cache: 'no-cache',
    })
      .then(response => response.text())
      .then(data => {
        const tweetsArray = data.split('\n').filter(tweet => tweet.trim() !== '');
        console.log('Fetched tweets:', tweetsArray); // Debug log fetched tweets
        setTweets(tweetsArray);
        setForceRerender(prevState => !prevState); // Toggle forceRerender state to force rerender
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  fetchTweets();
}, []);


  // const tweets = [ '1744937196849668348', '1715933527596814433']

  return (
 

    <>
      <VideoSection videoSrc={src} overlayText={<><h1>CyanoTRACKER</h1><h3>CyanoTRACKER employs a multi-cloud framework for early detection and dissemination of cyanobacterial harmful algal blooms (CyanoHABs) in inland waters worldwide</h3></>}></VideoSection>
      <TextImageSection content={contents} />
      {/* <PlayOnScrollVideo videoSrc={src} overlayText="dkjcdhvdjvhb"></PlayOnScrollVideo> */}
      {/* <h2>Watch the CyanoTRACKER Video</h2>
      <YouTubeVideo
        videoId="q-mtCnw6Yro"
        description="Watch the cyanotracker video below on how you can provide vital information during your next trip to the lake."
      />
      &nbsp; */}
      <div id="tweet-news-division">
      {/* {forceRerender && <Reacttweet key={Date.now()} tweets={tweets} />} */}
      <Reacttweet tweets={tweets}></Reacttweet>
      <NewsFeed></NewsFeed>
      </div>


      {/* 
      <iframe
  width="600"
  height="450"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Space+Needle,Seattle+WA">
</iframe>
  */}

      
    </>
  );
}

function App() {
  return (
    <>
    
      <Router>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<MainContent />} />
          {/* <Route path="/about" element={<About/>} />
          <Route path="/cyanoHAB" element={<cyanoHAB/>} /> */}
          <Route path="/Publications" element={<Publications/>} />
          <Route path="/Cyanosense2" element={<Cyanosense2/>} />
          <Route path='/Faq' element={<Faq/>}/>
          <Route path='/Teams' element={<Teams/>}/>
          <Route path='/Form' element={<Form/>}/> 
          <Route path='/Map' element={<MapComponent/>}/>
        </Routes>
      </Router>
      <Footer></Footer>   
    </>
  );
}

export default App;
