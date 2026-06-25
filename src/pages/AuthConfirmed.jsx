import React, { useCallback, useEffect, useRef, useState } from 'react';

import logo from '../assets/cyano_newlogo-removebg-preview.png';
import { supabase } from '../lib/supabase';
import './AuthConfirmed.css';

const APP_DEEP_LINK = 'com.chintan.cyanotracker://auth-confirmed';
const INVALID_CONFIRMATION_MESSAGE =
  'This signup confirmation link is invalid or has expired. Please request a new one.';

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

export function getSignupConfirmationToken(locationObject = window.location) {
  const query = new URLSearchParams(locationObject.search);
  const tokenHash = query.get('token_hash');
  const type = query.get('type');

  return tokenHash && type === 'signup' ? tokenHash : null;
}

function AuthConfirmed() {
  const [isMobile] = useState(isMobileDevice);
  const attemptedToOpen = useRef(false);
  const confirmationToken = useRef(getSignupConfirmationToken());
  const [status, setStatus] = useState(confirmationToken.current ? 'loading' : 'success');
  const [message, setMessage] = useState('');

  const openApp = useCallback(() => {
    window.location.assign(getAppDeepLink());
  }, []);

  useEffect(() => {
    let active = true;

    const confirmSignup = async () => {
      if (!confirmationToken.current) {
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash: confirmationToken.current,
        type: 'signup',
      });

      if (!active) return;

      if (error) {
        setStatus('error');
        setMessage(INVALID_CONFIRMATION_MESSAGE);
      } else {
        setStatus('success');
      }
    };

    confirmSignup();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (status !== 'success' || !isMobile || attemptedToOpen.current) {
      return;
    }

    attemptedToOpen.current = true;
    openApp();
  }, [isMobile, openApp, status]);

  const isConfirmed = status === 'success';

  return (
    <main className="auth-confirmed-page">
      <section className="auth-confirmed-card" aria-labelledby="auth-confirmed-title">
        <img className="auth-confirmed-logo" src={logo} alt="CyanoTRACKER" />
        <div className="auth-confirmed-icon" aria-hidden="true">
          {status === 'error' ? '!' : '✓'}
        </div>
        <h1 id="auth-confirmed-title">
          {status === 'error' ? 'Confirmation link expired' : 'Email confirmed'}
        </h1>
        {status === 'loading' && <p>Confirming your email…</p>}
        {isConfirmed && (
          <p>
            {isMobile
              ? 'Email confirmed successfully. Open the HAB Reporter app and log in.'
              : 'Email confirmed successfully. You can now log in to HAB Reporter.'}
          </p>
        )}
        {status === 'error' && (
          <p className="auth-confirmed-message error" role="alert">{message}</p>
        )}
        {isConfirmed && isMobile && (
          <button className="auth-confirmed-button" type="button" onClick={openApp}>
            Open HAB Reporter
          </button>
        )}
      </section>
    </main>
  );
}

export default AuthConfirmed;
