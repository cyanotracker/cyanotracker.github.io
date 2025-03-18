import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SUPABASE_URL = 'https://qayclaepxapjwqfwpnzm.supabase.co';
const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const VisitorCount = () => {
  const [visits, setVisits] = useState(0);
  const [monthlyVisits, setMonthlyVisits] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Fetch IP address
        const ipResponse = await axios.get('https://ipinfo.io/json?token=425691027acbe5');
        const ip = ipResponse.data.ip;

        // Fetching user agent
        const userAgent = navigator.userAgent;

        // Create a unique visitor key
        const visitorKey = `${ip}_${userAgent}`;

        // Get the current year and month
        const currentDate = new Date();
        const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

        // Check if the visitor already exists
        const { data: existingVisitor, error: visitorError } = await supabase
          .from('visitor_info')
          .select('id')
          .eq('visitor_key', visitorKey);

        if (visitorError) {
          throw new Error('Failed to fetch visitor data.');
        }

        if (existingVisitor.length === 0) {
          // Insert new visitor
          const { error: insertVisitorError } = await supabase
            .from('visitor_info')
            .insert([{ ip_addr: ip, user_agent: userAgent, visitor_key: visitorKey }]);

          if (insertVisitorError) {
            throw new Error('Failed to insert visitor data.');
          }

          // Update the monthly visitor count
          const { data: monthlyData, error: fetchMonthlyError } = await supabase
            .from('monthly_visitor_count')
            .select('id, count')
            .eq('year_month', yearMonth);

          if (fetchMonthlyError) {
            throw new Error('Failed to fetch monthly visitor data.');
          }

          if (monthlyData.length === 0) {
            // Insert a new row for the current month if not exists
            const { error: insertMonthlyError } = await supabase
              .from('monthly_visitor_count')
              .insert([{ year_month: yearMonth, count: 1 }]);

            if (insertMonthlyError) {
              throw new Error('Failed to insert monthly visitor data.');
            }
          } else {
            // Increment the count for the current month
            const { error: updateMonthlyError } = await supabase
              .from('monthly_visitor_count')
              .update({ count: monthlyData[0].count + 1 })
              .eq('year_month', yearMonth);

            if (updateMonthlyError) {
              throw new Error('Failed to update monthly visitor data.');
            }
          }
        }

        // Fetch the total number of visitors
        const { data: totalVisitors, error: totalError } = await supabase
          .from('visitor_info')
          .select('*');

        if (totalError) {
          throw new Error('Failed to fetch total visitor count.');
        }
        setVisits(totalVisitors.length);

        // Fetch the count for the current month
        const { data: currentMonthData, error: currentMonthError } = await supabase
          .from('monthly_visitor_count')
          .select('count')
          .eq('year_month', yearMonth);

        if (currentMonthError) {
          throw new Error('Failed to fetch monthly visitor count.');
        }

        if (currentMonthData.length > 0) {
          setMonthlyVisits(currentMonthData[0].count);
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <footer>
      {error && <p>Error: {error}</p>}
      <p>Total Visitor Count: {visits}</p>
    </footer>
  );
};

export default VisitorCount;
