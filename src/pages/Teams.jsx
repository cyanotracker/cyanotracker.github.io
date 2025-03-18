import React, { useEffect, useState } from 'react';
import TeamsComponent from '../components/TeamsComponent';

const Teams = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/TeamMembers.json', {
          cache: 'no-store' // Disabling the cache storage...
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

       
        setTeamMembers(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
    <div style={{ marginTop: '90px' }}>
      <TeamsComponent teamMembers={teamMembers} />
    </div>
    </div>
  );
};

export default Teams;
