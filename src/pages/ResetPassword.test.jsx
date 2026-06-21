jest.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      exchangeCodeForSession: jest.fn(),
      setSession: jest.fn(),
      updateUser: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StrictMode } from 'react';
import { supabase } from '../lib/supabase';
import { validatePassword } from '../lib/passwordValidation';
import ResetPassword, { establishRecoverySession, getRecoveryCredentials } from './ResetPassword';

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
