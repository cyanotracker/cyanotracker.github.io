/**
 * AdminPortalPage
 * ----------------
 * This component handles:
 * 1. Admin login UI
 * 2. Fetching monthly visitor data from Supabase
 * 3. Calculating KPI metrics (total, growth, avg, etc.)
 * 4. Rendering charts (Line + Bar) using Recharts
 */

import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import { supabase } from '../../lib/supabase';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

export default function AdminPortalPage({ mode, onLogin, onLogout }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [visitorData, setVisitorData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);
  const [chartError, setChartError] = useState('');

  const handleSubmit = () => {
    const success = onLogin(username, password);

    if (!success) {
      setError('Invalid username or password');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    if (mode !== 'login') {
      fetchVisitorTrend();
    }
  }, [mode]);

  const fetchVisitorTrend = async () => {
    try {
      setLoadingChart(true);
      setChartError('');

      const { data, error } = await supabase
        .from('monthly_visitor_count')
        .select('year_month, count')
        .not('year_month', 'is', null)
        .order('year_month', { ascending: true });

      if (error) throw error;

      const formattedData = (data || []).map((item) => ({
        month: item.year_month,
        users: Number(item.count) || 0,
      }));

      setVisitorData(formattedData);
    } catch (err) {
      console.error('Error fetching visitor trend:', err.message);
      setChartError('Failed to load visitor analytics');
    } finally {
      setLoadingChart(false);
    }
  };

  const kpiData = useMemo(() => {
    if (!visitorData.length) {
      return {
        latestUsers: 0,
        previousUsers: 0,
        growthPercentage: 0,
        averageUsers: 0,
        totalVisitors: 0,
      };
    }

    const latest = visitorData[visitorData.length - 1];
    const previous = visitorData[visitorData.length - 2];

    const latestUsers = latest?.users || 0;
    const previousUsers = previous?.users || 0;

    const growthPercentage =
      previousUsers > 0
        ? (((latestUsers - previousUsers) / previousUsers) * 100).toFixed(1)
        : 0;

    const totalVisitors = visitorData.reduce((sum, item) => sum + item.users, 0);
    const averageUsers = Math.round(totalVisitors / visitorData.length);

    return {
      latestUsers,
      previousUsers,
      growthPercentage,
      averageUsers,
      totalVisitors,
    };
  }, [visitorData]);

  if (mode === 'login') {
    return (
      <div className="login-page">
        <div className="login-overlay"></div>

        <div className="login-card">
          <div className="login-icon">A</div>

          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Enter your credentials to continue</p>

          <div className="login-input-group">
            <label className="login-label">Username</label>
            <input
              className="login-input"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-home">
      <div className="admin-header">
        <div className="header-spacer"></div>
        <h1 id="admin-heading">Admin Portal</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="admin-content">
        <div className="kpi-grid">
          <div className="kpi-card">
            <p>Total Visitors</p>
            <h2>{kpiData.totalVisitors}</h2>
          </div>

          <div className="kpi-card">
            <p>Latest Month</p>
            <h2>{kpiData.latestUsers}</h2>
          </div>

          <div className="kpi-card">
            <p>Previous Month</p>
            <h2>{kpiData.previousUsers}</h2>
          </div>

          <div className="kpi-card">
            <p>Growth</p>
            <h2 className={Number(kpiData.growthPercentage) >= 0 ? 'positive-text' : 'negative-text'}>
              {kpiData.growthPercentage}%
            </h2>
          </div>

          <div className="kpi-card">
            <p>Average Users per Month</p>
            <h2>{kpiData.averageUsers}</h2>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-card">
            <h3>Monthly Trend</h3>

            {loadingChart ? (
              <p className="chart-message">Loading chart...</p>
            ) : chartError ? (
              <p className="chart-error">{chartError}</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400]} />
                  <Tooltip />
                  <Line dataKey="users" stroke="#16355f" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="chart-card">
            <h3>Monthly Comparison</h3>

            {loadingChart ? (
              <p className="chart-message">Loading chart...</p>
            ) : chartError ? (
              <p className="chart-error">{chartError}</p>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400]} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#0b1f3a" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}