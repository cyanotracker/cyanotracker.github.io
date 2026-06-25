import React, { useCallback, useEffect, useRef, useState } from 'react';

import logo from '../assets/cyano_newlogo-removebg-preview.png';
import { supabase } from '../lib/supabase';
import { validatePassword } from '../lib/passwordValidation';
import './ResetPassword.css';

const INVALID_LINK_MESSAGE =
  'This password recovery link is invalid or has expired. Please request a new one.';
const SAME_PASSWORD_MESSAGE =
  'Your new password must be different from your previous password.';
const APP_DEEP_LINK = 'com.chintan.cyanotracker://reset-password';
const MOBILE_APP_FALLBACK_DELAY_MS = 1800;
const MOBILE_OPEN_ATTEMPT_STATE = 'habResetAppOpenAttempted';

export function isMobileDevice(navigatorObject = window.navigator) {
  const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(
    navigatorObject.userAgent || ''
  );
  const iPadDesktopMode =
    navigatorObject.platform === 'MacIntel' &&
    navigatorObject.maxTouchPoints > 1;

  return Boolean(navigatorObject.userAgentData?.mobile) || mobileUserAgent || iPadDesktopMode;
}

export function getResetAppDeepLink(locationObject = window.location) {
  return `${APP_DEEP_LINK}${locationObject.search || ''}${locationObject.hash || ''}`;
}

export function getUpdatePasswordErrorMessage(error) {
  const errorMessage = error?.message?.trim() || '';
  const isSamePassword = error?.code === 'same_password' ||
    /same password|matches? (?:the )?(?:old|previous|current) password|different from (?:the )?(?:old|previous|current) password/i
      .test(errorMessage);

  if (isSamePassword) return SAME_PASSWORD_MESSAGE;
  return errorMessage || 'Unable to update your password. Please try again.';
}

export function getRecoveryCredentials(locationObject = window.location) {
  const query = new URLSearchParams(locationObject.search);
  const hash = new URLSearchParams((locationObject.hash || '').replace(/^#/, ''));

  const code = query.get('code');
  const tokenHash = query.get('token_hash');
  const type = query.get('type');
  const accessToken = hash.get('access_token');
  const refreshToken = hash.get('refresh_token');

  if (code) return { type: 'code', code };
  if (tokenHash && type === 'recovery') {
    return { type: 'token_hash', tokenHash };
  }
  if (accessToken && refreshToken) {
    return { type: 'tokens', accessToken, refreshToken };
  }

  return null;
}

export async function establishRecoverySession(credentials, client = supabase) {
  if (!credentials) throw new Error(INVALID_LINK_MESSAGE);

  let result;
  if (credentials.type === 'code') {
    result = await client.auth.exchangeCodeForSession(credentials.code);
  } else if (credentials.type === 'token_hash') {
    result = await client.auth.verifyOtp({
      token_hash: credentials.tokenHash,
      type: 'recovery',
    });
  } else {
    result = await client.auth.setSession({
      access_token: credentials.accessToken,
      refresh_token: credentials.refreshToken,
    });
  }

  if (result.error || !result.data?.session) {
    throw result.error || new Error(INVALID_LINK_MESSAGE);
  }
}

function ResetPassword() {
  const recoveryCredentials = useRef(getRecoveryCredentials());
  const resetAppDeepLink = useRef(getResetAppDeepLink());
  const recoverySession = useRef(null);
  const attemptedToOpenApp = useRef(false);
  const appOpenWasAlreadyAttempted = useRef(
    Boolean(window.history.state?.[MOBILE_OPEN_ATTEMPT_STATE])
  );
  const [isMobile] = useState(isMobileDevice);
  const [status, setStatus] = useState('loading');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [message, setMessage] = useState('Verifying your recovery link…');

  const passwordRequirements = [
    { label: '8–72 characters', passed: password.length >= 8 && password.length <= 72 },
    { label: '1 uppercase letter', passed: /[A-Z]/.test(password) },
    { label: '1 lowercase letter', passed: /[a-z]/.test(password) },
    { label: '1 number', passed: /[0-9]/.test(password) },
    { label: '1 special character', passed: /[^A-Za-z0-9]/.test(password) },
  ];
  const passedRequirementCount = passwordRequirements.filter(({ passed }) => passed).length;
  const passwordIsValid = passedRequirementCount === passwordRequirements.length;
  const passwordsMatch = Boolean(password && confirmPassword && password === confirmPassword);
  const showMismatch = Boolean(password && confirmPassword && password !== confirmPassword);
  const strength = passedRequirementCount === 5
    ? 'Strong'
    : passedRequirementCount >= 3 ? 'Moderate' : 'Weak';

  const openApp = useCallback(() => {
    window.location.assign(resetAppDeepLink.current);
  }, []);

  useEffect(() => {
    let active = true;
    let fallbackTimer;

    // Remove recovery credentials from the visible URL before any network request.
    window.history.replaceState(
      isMobile && recoveryCredentials.current
        ? { ...window.history.state, [MOBILE_OPEN_ATTEMPT_STATE]: true }
        : window.history.state,
      '',
      '/reset-password'
    );

    const establishWebSession = () => {
      if (!recoverySession.current) {
        recoverySession.current = establishRecoverySession(recoveryCredentials.current);
      }

      recoverySession.current
        .then(() => {
          if (active) {
            setStatus('ready');
            setMessage('');
          }
        })
        .catch((error) => {
          if (active) {
            setStatus('error');
            setMessage(error?.message?.trim() || INVALID_LINK_MESSAGE);
          }
        });
    };

    const shouldAttemptApp =
      isMobile &&
      recoveryCredentials.current &&
      !attemptedToOpenApp.current &&
      !appOpenWasAlreadyAttempted.current;

    if (shouldAttemptApp) {
      attemptedToOpenApp.current = true;
      openApp();
      fallbackTimer = window.setTimeout(() => {
        if (document.visibilityState === 'visible') {
          establishWebSession();
        }
      }, MOBILE_APP_FALLBACK_DELAY_MS);
    } else {
      establishWebSession();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !recoverySession.current) {
        establishWebSession();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      active = false;
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobile, openApp]);

  const updatePassword = async (event) => {
    event.preventDefault();

    if (validatePassword(password) || !passwordsMatch) {
      return;
    }

    setStatus('updating');
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    } catch (error) {
      setStatus('ready');
      setMessage(getUpdatePasswordErrorMessage(error));
      return;
    }

    await supabase.auth.signOut();
    setPassword('');
    setConfirmPassword('');
    setStatus('success');
    setMessage('Password updated successfully. You can now log in to HAB Reporter.');
  };

  return (
    <main className="reset-password-page">
      <section className="reset-password-card" aria-labelledby="reset-password-title">
        <img className="reset-password-logo" src={logo} alt="CyanoTRACKER" />
        <h1 id="reset-password-title">Reset password</h1>

        {status === 'ready' || status === 'updating' ? (
          <form onSubmit={updatePassword}>
            <label htmlFor="new-password">New password</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              maxLength="72"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />

            {isPasswordFocused && (
              <div className="password-feedback">
                <div className="password-strength-row">
                  <span>Password strength</span>
                  <strong className={`strength-${strength.toLowerCase()}`}>{strength}</strong>
                </div>
                <div className="password-strength-track" aria-hidden="true">
                  <span
                    className={`password-strength-fill strength-${strength.toLowerCase()}`}
                    style={{ width: `${(passedRequirementCount / 5) * 100}%` }}
                  />
                </div>
                <ul className="password-requirements" aria-label="Password requirements">
                  {passwordRequirements.map(({ label, passed }) => (
                    <li key={label} className={passed ? 'passed' : ''}>
                      <span aria-hidden="true">{passed ? '✓' : '○'}</span> {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              maxLength="72"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onFocus={() => setIsPasswordFocused(false)}
              required
            />

            {showMismatch && (
              <p className="password-match-error" role="alert">Password does not match.</p>
            )}

            {message && <p className="reset-password-message error" role="alert">{message}</p>}
            <button
              type="submit"
              disabled={status === 'updating' || !passwordIsValid || !passwordsMatch}
            >
              {status === 'updating' ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <p
            className={`reset-password-message ${status === 'error' ? 'error' : ''}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            {message}
          </p>
        )}
      </section>
    </main>
  );
}

export default ResetPassword;
