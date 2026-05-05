import React, { useEffect, useState } from 'react';
import AdminPortalPage from '../components/AdminPortalPage/index';

export default function AdminPage() {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const alreadyAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    setIsAllowed(alreadyAuthenticated === 'true');
  }, []);

  const handleLogin = (username, password) => {

    // fetching the username password form the environmental variables....

    const adminUsername=process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassWord=process.env.REACT_APP_ADMIN_PASSWORD;



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
    window.location.hash = '#/';
  };

  if (isAllowed === null) {
    return (
      <div className="checking-access">
        Checking access...
      </div>
    );
  }

  return isAllowed ? (
    <AdminPortalPage mode="home" onLogout={handleLogout} />
  ) : (
    <AdminPortalPage mode="login" onLogin={handleLogin} />
  );
}