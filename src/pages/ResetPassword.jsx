import React, { useEffect, useRef, useState } from 'react';

import logo from '../assets/cyano_newlogo-removebg-preview.png';
import { supabase } from '../lib/supabase';
import { validatePassword } from '../lib/passwordValidation';
import './ResetPassword.css';

const INVALID_LINK_MESSAGE =
  'This password recovery link is invalid or has expired. Please request a new one.';

export function getRecoveryCredentials(locationObject = window.location) {
  const query = new URLSearchParams(locationObject.search);
  const hash = new URLSearchParams((locationObject.hash || '').replace(/^#/, ''));

  const code = query.get('code');
  const accessToken = hash.get('access_token');
  const refreshToken = hash.get('refresh_token');

  if (code) return { type: 'code', code };
  if (accessToken && refreshToken) {
    return { type: 'tokens', accessToken, refreshToken };
  }

  return null;
}

export async function establishRecoverySession(credentials, client = supabase) {
  if (!credentials) throw new Error(INVALID_LINK_MESSAGE);

  const result = credentials.type === 'code'
    ? await client.auth.exchangeCodeForSession(credentials.code)
    : await client.auth.setSession({
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
      });

  if (result.error || !result.data?.session) {
    throw result.error || new Error(INVALID_LINK_MESSAGE);
  }
}

function ResetPassword() {
  const recoveryCredentials = useRef(getRecoveryCredentials());
  const recoverySession = useRef(null);
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

  useEffect(() => {
    let active = true;

    // Remove recovery credentials from the visible URL before any network request.
    window.history.replaceState(null, '', '/reset-password');

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
      .catch(() => {
        if (active) {
          setStatus('error');
          setMessage(INVALID_LINK_MESSAGE);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const updatePassword = async (event) => {
    event.preventDefault();

    if (validatePassword(password) || !passwordsMatch) {
      return;
    }

    setStatus('updating');
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus('ready');
      setMessage('Unable to update your password. Please request a new recovery link.');
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
