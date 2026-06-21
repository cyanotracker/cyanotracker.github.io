import React, { useCallback, useEffect, useRef, useState } from 'react';

import logo from '../assets/cyano_newlogo-removebg-preview.png';
import './AuthConfirmed.css';

const APP_DEEP_LINK = 'com.chintan.cyanotracker://auth-confirmed';

export function isMobileDevice(navigatorObject = window.navigator) {
  const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(
    navigatorObject.userAgent || ''
  );
  const iPadDesktopMode =
    navigatorObject.platform === 'MacIntel' &&
    navigatorObject.maxTouchPoints > 1;

  return Boolean(navigatorObject.userAgentData?.mobile) || mobileUserAgent || iPadDesktopMode;
}

export function getAppDeepLink(locationObject = window.location) {
  return `${APP_DEEP_LINK}${locationObject.search}${locationObject.hash}`;
}

function AuthConfirmed() {
  const [isMobile] = useState(isMobileDevice);
  const attemptedToOpen = useRef(false);

  const openApp = useCallback(() => {
    window.location.assign(getAppDeepLink());
  }, []);

  useEffect(() => {
    if (!isMobile || attemptedToOpen.current) {
      return;
    }

    attemptedToOpen.current = true;
    openApp();
  }, [isMobile, openApp]);

  return (
    <main className="auth-confirmed-page">
      <section className="auth-confirmed-card" aria-labelledby="auth-confirmed-title">
        <img className="auth-confirmed-logo" src={logo} alt="CyanoTRACKER" />
        <div className="auth-confirmed-icon" aria-hidden="true">✓</div>
        <h1 id="auth-confirmed-title">Email confirmed</h1>
        <p>
          {isMobile
            ? 'Email confirmed successfully. Open the HAB Reporter app and log in.'
            : 'Email confirmed successfully. You can now log in to HAB Reporter.'}
        </p>
        {isMobile && (
          <button className="auth-confirmed-button" type="button" onClick={openApp}>
            Open HAB Reporter
          </button>
        )}
      </section>
    </main>
  );
}

export default AuthConfirmed;
