jest.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      exchangeCodeForSession: jest.fn(),
      setSession: jest.fn(),
      verifyOtp: jest.fn(),
      updateUser: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StrictMode } from 'react';
import { supabase } from '../lib/supabase';
import { validatePassword } from '../lib/passwordValidation';
import { getResetPasswordFallbackPath } from '../lib/resetPasswordFallback';
import ResetPassword, {
  establishRecoverySession,
  getRecoveryCredentials,
  getResetAppDeepLink,
  getUpdatePasswordErrorMessage,
  isMobileDevice,
} from './ResetPassword';

beforeEach(() => {
  jest.clearAllMocks();
  window.history.replaceState(null, '', '/');
});

test('reads PKCE code recovery links', () => {
  expect(getRecoveryCredentials({ search: '?code=one-time-code', hash: '' })).toEqual({
    type: 'code',
    code: 'one-time-code',
  });
});

test('reads implicit token recovery links', () => {
  expect(
    getRecoveryCredentials({
      search: '',
      hash: '#access_token=access-secret&refresh_token=refresh-secret&type=recovery',
    })
  ).toEqual({
    type: 'tokens',
    accessToken: 'access-secret',
    refreshToken: 'refresh-secret',
  });
});

test('reads token hash recovery links', () => {
  expect(
    getRecoveryCredentials({
      search: '?token_hash=test-token-hash&type=recovery',
      hash: '',
    })
  ).toEqual({
    type: 'token_hash',
    tokenHash: 'test-token-hash',
  });
});

test('exchanges a PKCE code for a recovery session', async () => {
  const exchangeCodeForSession = jest.fn().mockResolvedValue({
    data: { session: { user: { id: 'user-id' } } },
    error: null,
  });

  await establishRecoverySession(
    { type: 'code', code: 'one-time-code' },
    { auth: { exchangeCodeForSession } }
  );

  expect(exchangeCodeForSession).toHaveBeenCalledWith('one-time-code');
});

test('uses token pairs to establish a recovery session', async () => {
  const setSession = jest.fn().mockResolvedValue({
    data: { session: { user: { id: 'user-id' } } },
    error: null,
  });

  await establishRecoverySession(
    { type: 'tokens', accessToken: 'access-secret', refreshToken: 'refresh-secret' },
    { auth: { setSession } }
  );

  expect(setSession).toHaveBeenCalledWith({
    access_token: 'access-secret',
    refresh_token: 'refresh-secret',
  });
});

test('uses token hashes to establish a recovery session', async () => {
  const verifyOtp = jest.fn().mockResolvedValue({
    data: { session: { user: { id: 'user-id' } } },
    error: null,
  });

  await establishRecoverySession(
    { type: 'token_hash', tokenHash: 'test-token-hash' },
    { auth: { verifyOtp } }
  );

  expect(verifyOtp).toHaveBeenCalledWith({
    token_hash: 'test-token-hash',
    type: 'recovery',
  });
});

test('verifies token hash recovery links from the reset page', async () => {
  supabase.auth.verifyOtp.mockResolvedValue({
    data: { session: { user: { id: 'user-id' } } },
    error: null,
  });
  window.history.replaceState(
    null,
    '',
    '/reset-password?token_hash=test-token-hash&type=recovery'
  );

  render(<ResetPassword />);

  expect(await screen.findByLabelText('New password')).toBeInTheDocument();
  expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
    token_hash: 'test-token-hash',
    type: 'recovery',
  });
});

test('updates the password after token hash recovery succeeds', async () => {
  supabase.auth.verifyOtp.mockResolvedValue({
    data: { session: { user: { id: 'user-id' } } },
    error: null,
  });
  supabase.auth.updateUser.mockResolvedValue({ error: null });
  supabase.auth.signOut.mockResolvedValue({ error: null });
  window.history.replaceState(null, '', '/reset-password?token_hash=test-token&type=recovery');

  render(<ResetPassword />);

  fireEvent.change(await screen.findByLabelText('New password'), {
    target: { value: 'ValidPass1!' },
  });
  fireEvent.change(screen.getByLabelText('Confirm password'), {
    target: { value: 'ValidPass1!' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

  await waitFor(() => {
    expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
      token_hash: 'test-token',
      type: 'recovery',
    });
    expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: 'ValidPass1!' });
  });
  expect(await screen.findByText(
    'Password updated successfully. You can now log in to HAB Reporter.'
  )).toBeInTheDocument();
});

test('constructs the mobile deep link without changing query or hash parameters', () => {
  expect(getResetAppDeepLink({
    search: '?code=a%2Bb&next=%2Fhome',
    hash: '#access_token=access-secret&refresh_token=refresh-secret&type=recovery',
  })).toBe(
    'com.chintan.cyanotracker://reset-password?code=a%2Bb&next=%2Fhome' +
    '#access_token=access-secret&refresh_token=refresh-secret&type=recovery'
  );
  expect(isMobileDevice({ userAgent: 'Mozilla/5.0 (Linux; Android 14)', platform: '' }))
    .toBe(true);
  expect(isMobileDevice({ userAgent: 'Mozilla/5.0 (Windows NT 10.0)', platform: '' }))
    .toBe(false);
});

test('rewrites GitHub Pages reset-password fallback to the React route', () => {
  expect(getResetPasswordFallbackPath({
    search: '?reset-password=1&code=one-time-code',
    hash: '#access_token=access-secret',
  })).toBe('/reset-password?code=one-time-code#access_token=access-secret');
  expect(getResetPasswordFallbackPath({
    search: '?code=one-time-code',
    hash: '',
  })).toBeNull();
});

test('maps same-password errors to the required message', () => {
  const expectedMessage = 'Your new password must be different from your previous password.';

  expect(getUpdatePasswordErrorMessage({ code: 'same_password', message: 'Password rejected' }))
    .toBe(expectedMessage);
  expect(getUpdatePasswordErrorMessage({
    message: 'New password should be different from the old password.',
  })).toBe(expectedMessage);
});

test('preserves an expired recovery-link error', async () => {
  supabase.auth.exchangeCodeForSession.mockResolvedValue({
    data: { session: null },
    error: { message: 'Email link is expired' },
  });
  window.history.replaceState(null, '', '/reset-password?code=expired-code');

  render(<ResetPassword />);

  expect(await screen.findByRole('alert')).toHaveTextContent('Email link is expired');
});

test('shows the specific same-password error after form submission', async () => {
  supabase.auth.exchangeCodeForSession.mockResolvedValue({
    data: { session: { user: { id: 'user-id' } } },
    error: null,
  });
  supabase.auth.updateUser.mockResolvedValue({
    error: { code: 'same_password', message: 'New password matches the old password' },
  });
  window.history.replaceState(null, '', '/reset-password?code=one-time-code');

  render(<ResetPassword />);

  fireEvent.change(await screen.findByLabelText('New password'), {
    target: { value: 'ValidPass1!' },
  });
  fireEvent.change(screen.getByLabelText('Confirm password'), {
    target: { value: 'ValidPass1!' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

  expect(await screen.findByText(
    'Your new password must be different from your previous password.'
  )).toBeInTheDocument();
});

test('matches the HAB Reporter password rules', () => {
  expect(validatePassword('short')).toBe('Password must be at least 8 characters.');
  expect(validatePassword('ValidPass1!')).toBe('');
});

test('completes the password-reset form flow and clears recovery credentials', async () => {
  supabase.auth.exchangeCodeForSession.mockResolvedValue({
    data: { session: { user: { id: 'user-id' } } },
    error: null,
  });
  supabase.auth.updateUser.mockResolvedValue({ error: null });
  supabase.auth.signOut.mockResolvedValue({ error: null });
  window.history.replaceState(null, '', '/reset-password?code=one-time-code');

  render(
    <StrictMode>
      <ResetPassword />
    </StrictMode>
  );

  expect(await screen.findByLabelText('New password')).toBeInTheDocument();
  expect(window.location.pathname).toBe('/reset-password');
  expect(window.location.search).toBe('');
  expect(supabase.auth.exchangeCodeForSession).toHaveBeenCalledTimes(1);

  const passwordInput = screen.getByLabelText('New password');
  const confirmInput = screen.getByLabelText('Confirm password');
  const resetButton = screen.getByRole('button', { name: 'Reset Password' });

  expect(resetButton).toBeDisabled();
  fireEvent.focus(passwordInput);
  expect(screen.getByText('Weak')).toBeInTheDocument();
  expect(screen.getByRole('list', { name: 'Password requirements' })).toBeInTheDocument();

  fireEvent.change(passwordInput, {
    target: { value: 'ValidPass1!' },
  });
  expect(screen.getByText('Strong')).toBeInTheDocument();

  fireEvent.focus(confirmInput);
  expect(screen.queryByRole('list', { name: 'Password requirements' })).not.toBeInTheDocument();
  fireEvent.change(confirmInput, {
    target: { value: 'OtherPass1!' },
  });
  expect(screen.getByRole('alert')).toHaveTextContent('Password does not match.');
  expect(resetButton).toBeDisabled();

  fireEvent.change(confirmInput, {
    target: { value: 'ValidPass1!' },
  });
  expect(screen.queryByText('Password does not match.')).not.toBeInTheDocument();
  expect(resetButton).toBeEnabled();
  fireEvent.click(resetButton);

  await waitFor(() => {
    expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: 'ValidPass1!' });
  });
  expect(await screen.findByText(
    'Password updated successfully. You can now log in to HAB Reporter.'
  )).toBeInTheDocument();
  expect(supabase.auth.signOut).toHaveBeenCalled();
});
