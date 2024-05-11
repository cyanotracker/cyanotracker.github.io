import React, { useState } from 'react';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import PublicationCard from '../components/PublicationCard';
import publicationsData from '../assets/publications.json';

const groupPublicationsByYear = (publications) => {
  const groupedPublications = {};
  publications.forEach((publication) => {
    if (!groupedPublications[publication.year]) {
      groupedPublications[publication.year] = [];
    }
    groupedPublications[publication.year].push(publication);
  });

  // Sort the keys in reverse order (descending)
  const sortedYears = Object.keys(groupedPublications).sort((a, b) => b - a);

  return sortedYears.map((year) => ({
    year,
    publications: groupedPublications[year],
  }));
};

const Publications = () => {
  const [value, setValue] = useState('journalArticles');

  const journalArticles = groupPublicationsByYear(publicationsData.filter((publication) => publication.type === 'journal'));
  const conferenceProceedings = groupPublicationsByYear(publicationsData.filter((publication) => publication.type === 'conference-proceedings'));
  const conferencePresentations = groupPublicationsByYear(publicationsData.filter((publication) => publication.type === 'conference-presentations'));
  const mediaHighlights = publicationsData.filter((publication) => publication.type === 'media-highlights').sort((a,b) => b.year-a.year)
  const [activeTab, setActiveTab] = useState('journalArticles');
console.log("mediaHighlights...............",mediaHighlights);
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };
  return (
    <div id="tab-container" style={{ marginTop: '122px' }}>
      <TabContext value={value}>
         <TabList
    onChange={(e, newValue) => setValue(newValue)}
    variant="scrollable"
    scrollButtons
    allowScrollButtonsMobile
    sx={{
      flexDirection: 'row',
      flexWrap: 'nowrap', // Ensure tabs stay in one line
      overflowX: 'auto', // Enable horizontal scrolling
      //".MuiTabs-flexContainer":{position:'fixed',top:'122px',zIndex:'20000',width:'100%',backgroundColor:'#333', '@media (max-width: 600px)':{width:'60%'},'@media (max-width: 375px)':{width:'100%'}},
         
      "& button.MuiButtonBase-root": { color: '#fff' },
      "& button.Mui-selected:nth-child(1)": { color: '#8FC1DA' },
      "& button.Mui-selected:nth-child(2)": { color: '#E0AED0' },
      "& button.Mui-selected:nth-child(3)": { color: '#FEFFaC' },
      "& button.Mui-selected:nth-child(4)": { color: 'orange' },
      '@media (max-width: 600px)': {
        width: '100%', // Adjust width for smaller devices
      },
      '@media (max-width: 375px)': {
        width: '60%', // Adjust width for even smaller devices
      },
    }}
  >
        
          <Tab sx={{}}
        label={<span style={{ 'fontFamily': 'Arial,sans-serif', 'fontSize': '20px', 'fontWeight': 'bold' }}>Journal Articles</span>}
        value="journalArticles"
        activeStyle={{ color: 'pink' }}
        onChange={handleTabChange}
      />
      <Tab
        label={<span style={{ 'fontFamily': 'Arial,sans-serif', 'fontSize': '20px', 'fontWeight': 'bold' }}>Conference Proceedings</span>}
        value="conferenceProceedings"
        activeStyle={{ color:'white' }}
        onChange={handleTabChange}

      />
      <Tab
        label={<span style={{ 'fontFamily': 'Arial,sans-serif', 'fontSize': '20px', 'fontWeight': 'bold' }}>Conference Presentations</span>}
        value="conferencePresentations"
        activeStyle={{ color: 'orange' }}
        onChange={handleTabChange}
      />
      <Tab
        label={<span style={{  'fontFamily': 'Arial,sans-serif', 'fontSize': '20px', 'fontWeight': 'bold' ,}}>Media Highlights</span>}
        value="mediaHighlights"
        activeStyle={{ color: 'pink' }}
        onChange={handleTabChange}
      />
  </TabList>

        <TabPanel value="journalArticles">
          {journalArticles.map(({ year, publications }) => (
            <div key={year}>
              <h2 className="year-heading">{year}</h2>
              <hr style={{ border: '4px solid #8FC1DA' }}></hr>
              {publications.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          ))}
        </TabPanel>

        <TabPanel value="conferenceProceedings">
          {conferenceProceedings.map(({ year, publications }) => (
            <div key={year}>
              <h2 className="year-heading">{year}</h2>
              <hr style={{ border: '4px solid #E0AED0' }}></hr>
              {publications.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          ))}
        </TabPanel>

        <TabPanel value="conferencePresentations">
          {conferencePresentations.map(({ year, publications }) => (
            <div key={year}>
              <h2 className="year-heading">{year}</h2>
              <hr style={{ border: '4px solid #FEFFaC' }}></hr>
              {publications.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          ))}
        </TabPanel>

        <TabPanel value="mediaHighlights">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {mediaHighlights.map((publication, index) => (
              <PublicationCard key={index} {...publication} />
            ))}
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Publications;
