import React, { useState, useEffect } from 'react';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import PublicationCard from '../components/PublicationCard';

const groupPublicationsByYear = (publications) => {
  const groupedPublications = {};
  publications.forEach((publication) => {
    if (!groupedPublications[publication.year]) {
      groupedPublications[publication.year] = [];
    }
    groupedPublications[publication.year].push(publication);
  });

  const sortedYears = Object.keys(groupedPublications).sort((a, b) => b - a);

  return sortedYears.map((year) => ({
    year,
    publications: groupedPublications[year],
  }));
};

const Publications = () => {
  const [value, setValue] = useState('journalArticles');
  const [publicationsData, setPublicationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        console.log('Fetching publications data...');
        const response = await fetch('https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/publications.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched publications data:', data);
        setPublicationsData(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const journalArticles = groupPublicationsByYear(publicationsData.filter((publication) => publication.type === 'journal'));
  const conferenceProceedings = groupPublicationsByYear(publicationsData.filter((publication) => publication.type === 'conference-proceedings'));
  const conferencePresentations = groupPublicationsByYear(publicationsData.filter((publication) => publication.type === 'conference-presentations'));
  const mediaHighlights = publicationsData.filter((publication) => publication.type === 'media-highlights').sort((a, b) => b.year - a.year);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>Loading th publications...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  if (publicationsData.length === 0) {
    return <div>No publications available</div>;
  }

  return (
    <div>
    <div id="tab-container" style={{ marginTop: '122px' }}>
      <TabContext value={value}>
        <TabList
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            "& button.MuiButtonBase-root": { color: '#fff' },
            "& button.Mui-selected:nth-child(1)": { color: '#8FC1DA' },
            "& button.Mui-selected:nth-child(2)": { color: '#E0AED0' },
            "& button.Mui-selected:nth-child(3)": { color: '#FEFFaC' },
            "& button.Mui-selected:nth-child(4)": { color: 'orange' },
            '@media (max-width: 600px)': {
              width: '100%',
            },
            '@media (max-width: 375px)': {
              width: '60%',
            },
          }}
        >
          <Tab
            label={<span style={{ fontFamily: 'Arial,sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Journal Articles</span>}
            value="journalArticles"
          />
          <Tab
            label={<span style={{ fontFamily: 'Arial,sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Conference Proceedings</span>}
            value="conferenceProceedings"
          />
          <Tab
            label={<span style={{ fontFamily: 'Arial,sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Conference Presentations</span>}
            value="conferencePresentations"
          />
          <Tab
            label={<span style={{ fontFamily: 'Arial,sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Media Highlights</span>}
            value="mediaHighlights"
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
    </div>
  );
};

export default Publications;
