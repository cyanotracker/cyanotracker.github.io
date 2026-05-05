import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPortalPage from '../components/AdminPortalPage/index';

export default function AdminPage() {
  const [isAllowed, setIsAllowed] = useState(null);
  const navigate = useNavigate();   // 👈 add this

  useEffect(() => {
    const alreadyAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    setIsAllowed(alreadyAuthenticated === 'true');
  }, []);

  const handleLogin = (username, password) => {
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassWord = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassWord) {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setIsAllowed(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAllowed(false);
    navigate('/');  // Redirecting to the home page..
  };

  if (isAllowed === null) {
    return <div className="checking-access">Checking access...</div>;
  }

  return isAllowed ? (
    <AdminPortalPage mode="home" onLogout={handleLogout} />
  ) : (
    <AdminPortalPage mode="login" onLogin={handleLogin} />
  );
}