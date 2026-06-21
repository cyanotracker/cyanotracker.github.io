import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation,Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import VideoSection from './components/VideoSection';
import TextImageSection from './components/TextImageSection';
import Footer from './components/Footer';
import YouTubeVideo from './components/YouTubeVideo';
import SponsorDisplay from './components/SponsorDisplay';
import Reacttweet from './components/React-tweet';
import NewsFeed from './components/NewsFeed/index.jsx';
import MapComponent from './components/MapComponent';
import BlogComponent from './components/BlogComponent/index.jsx';
import SocialBar from './components/Socials/SocialBar.jsx';

import Faq from './pages/Faq.jsx';
import Publications from './pages/Publications.jsx';
import Cyanosense2 from './pages/Cyanosense2.jsx';
import Teams from './pages/Teams.jsx';
import Form from './pages/Form.jsx';
import Gallery from './pages/Gallery.jsx';
import AdminPage from './pages/AdminPage';
import AuthConfirmed from './pages/AuthConfirmed';
import ResetPassword from './pages/ResetPassword';

import src from './assets/algae2.mp4';
import ourapproach from './assets/our_approach.png';
import logo from './assets/UGA_Cyano.png';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import NotFound from './components/NotFound/index.jsx';

function MainContent() {
  const [tweets, setTweets] = useState([]);
  const [contents, setContents] = useState([
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
  ]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/HomePage_Images/our_approach.png',
          { cache: 'no-cache' }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch image URL: ${response.status}`);
        }

        const url = response.url;

        setContents((prevContents) =>
          prevContents.map((content) =>
            content.title === 'Our Approach'
              ? { ...content, imageUrl: url }
              : content
          )
        );
      } catch (error) {
        console.error('Error fetching image URL:', error);

        setContents((prevContents) =>
          prevContents.map((content) =>
            content.title === 'Our Approach'
              ? { ...content, imageUrl: ourapproach }
              : content
          )
        );
      }
    };

    fetchImageUrls();
  }, []);

  useEffect(() => {
    const fetchTweets = () => {
      fetch(
        `https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/cyano_tweet_ids.txt?${new Date().getTime()}`,
        { cache: 'no-cache' }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch tweets: ${response.status}`);
          }

          return response.text();
        })
        .then((data) => {
          const tweetsArray = data
            .split(/\r?\n/)
            .map((tweet) => tweet.trim())
            .filter((tweet) => /^\d+$/.test(tweet));
          setTweets(tweetsArray);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    };

    fetchTweets();
  }, []);

  return (
    <>
      <VideoSection
        videoSrc={src}
        overlayText={
          <>
            <img src={logo} id="logo" alt="CyanoTRACKER logo" />
            <h3 id="cyano-heading">
              CyanoTRACKER employs a multi-cloud framework for early detection and dissemination of cyanobacterial harmful algal blooms (CyanoHABs) in inland waters worldwide
            </h3>
          </>
        }
      />

      <TextImageSection content={contents} />

      <div id="tweet-news-division">
        <Reacttweet tweets={tweets} />
        <NewsFeed />
      </div>
    </>
  );
}

function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname === '/admin' ||
    location.pathname === '/auth-confirmed' ||
    location.pathname === '/reset-password' ||
    location.pathname === '/not-found';

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/Publications" element={<Publications />} />
        <Route path="/Cyanosense2" element={<Cyanosense2 />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Map" element={<MapComponent />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/auth-confirmed" element={<AuthConfirmed />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
