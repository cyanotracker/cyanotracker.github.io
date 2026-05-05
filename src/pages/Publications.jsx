import React, { useState, useEffect } from 'react';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import PublicationCard from '../components/PublicationCard';
import GitRepoCard from '../components/GitRepoCard';

import './Publications.css';

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
  const [gitReposData, setReposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/publications.json',
          { cache: 'no-cache' }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPublicationsData(data);
      } catch (error) {
        setError(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  useEffect(() => {
    const gitRepos = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/cyanotracker/repos'
        );

        if (!response.ok) {
          throw new Error(`GitHub API error! status: ${response.status}`);
        }

        const gitData = await response.json();
        setReposData(gitData);
      } catch (error) {
        setError(error.message || 'Unknown error occurred');
      }
    };

    gitRepos();
  }, []);

  const journalArticles = groupPublicationsByYear(
    publicationsData.filter((publication) => publication.type === 'journal')
  );

  const conferenceProceedings = groupPublicationsByYear(
    publicationsData.filter(
      (publication) => publication.type === 'conference-proceedings'
    )
  );

  const conferencePresentations = groupPublicationsByYear(
    publicationsData.filter(
      (publication) => publication.type === 'conference-presentations'
    )
  );

  const mediaHighlights = publicationsData
    .filter((publication) => publication.type === 'media-highlights')
    .sort((a, b) => b.year - a.year);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>Loading the publications...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  if (publicationsData.length === 0) {
    return <div>No publications available</div>;
  }

  return (
    <div className="publications-page">
      <div id="tab-container">
        <TabContext value={value}>
          <TabList
            className="publications-tab-list"
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Journal Articles" value="journalArticles" />
            <Tab label="Conference Proceedings" value="conferenceProceedings" />
            <Tab label="Conference Presentations" value="conferencePresentations" />
            <Tab label="Media Highlights" value="mediaHighlights" />
            <Tab label="Code" value="gitRepositories" />
          </TabList>

          <TabPanel value="journalArticles">
            {journalArticles.map(({ year, publications }) => (
              <div key={year}>
                <h2 className="year-heading">{year}</h2>
                <hr className="journal-line" />
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
                <hr className="proceedings-line" />
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
                <hr className="presentations-line" />
                {publications.map((publication, index) => (
                  <PublicationCard key={index} {...publication} />
                ))}
              </div>
            ))}
          </TabPanel>

          <TabPanel value="mediaHighlights">
            <div className="media-highlights-wrapper">
              {mediaHighlights.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          </TabPanel>

          <TabPanel value="gitRepositories">
            <div className="git-grid">
              {gitReposData.map((repo) => (
                <GitRepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default Publications;