import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SUPABASE_URL = 'https://qayclaepxapjwqfwpnzm.supabase.co';
const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const VisitorCount = () => {
  const [visits, setVisits] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Fetch IP address
        let ip;
        try {
          const ipResponse = await axios.get('https://ipinfo.io/json?token=425691027acbe5');
          ip = ipResponse.data.ip;
          console.log('Visitor IP:', ip);
        } catch (ipError) {
          console.error('Error fetching IP:', ipError);
          setError('Failed to fetch visitor IP');
          return; // Early return if IP fetch fails
        }

        // Fetching user agent
        const userAgent = navigator.userAgent;
        console.log('User Agent:', userAgent);

        // Create a unique key based on IP and user agent
        const visitorKey = `${ip}_${userAgent}`;
        console.log('Visitor Key:', visitorKey);

        // Check if the visitor already exists in Supabase
        const { data: existingVisitor, error: fetchError } = await supabase
          .from('visitor_info')
          .select('id')
          .eq('visitor_key', visitorKey);

        if (fetchError) {
          console.error('Error fetching visitor data from Supabase:', fetchError);
          setError('Failed to fetch visitor data');
          return;
        }

        // If visitor doesn't exist, insert new entry
        if (existingVisitor.length === 0) {
          const { data, error: insertError } = await supabase
            .from('visitor_info')
            .insert([{ ip_addr: ip, user_agent: userAgent, visitor_key: visitorKey }]);

          if (insertError) {
            console.error('Error inserting visitor data into Supabase:', insertError);
            setError('Failed to store visitor data');
            return;
          } else {
            console.log('Visitor data stored in Supabase:', data);
          }
        }

        // Fetch the total number of visitors from Supabase
        const { data: totalVisitors, error: countError } = await supabase
          .from('visitor_info')
          .select('*');

        if (countError) {
          console.error('Error fetching total visitors:', countError);
          setError('Failed to fetch total visitor count');
        } else {
          setVisits(totalVisitors.length);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <footer>
      {/* {error && <p>Error: {error}</p>} */}
      <p>Visitor Count: {visits}</p>
    </footer>
  );
};

export default VisitorCount;
