jest.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      verifyOtp: jest.fn(),
    },
  },
}));

import { render, screen } from '@testing-library/react';
import { supabase } from '../lib/supabase';
import AuthConfirmed from './AuthConfirmed';

beforeEach(() => {
  jest.clearAllMocks();
  window.history.replaceState(null, '', '/');
});

test('confirms signup token hash links', async () => {
  supabase.auth.verifyOtp.mockResolvedValue({
    data: { user: { id: 'user-id' } },
    error: null,
  });
  window.history.replaceState(null, '', '/auth-confirmed?token_hash=test-token&type=signup');

  render(<AuthConfirmed />);

  expect(await screen.findByText(
    'Email confirmed successfully. You can now log in to HAB Reporter.'
  )).toBeInTheDocument();
  expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
    token_hash: 'test-token',
    type: 'signup',
  });
});

test('shows an invalid signup confirmation message when token verification fails', async () => {
  supabase.auth.verifyOtp.mockResolvedValue({
    data: null,
    error: { message: 'Token has expired' },
  });
  window.history.replaceState(null, '', '/auth-confirmed?token_hash=test-token&type=signup');

  render(<AuthConfirmed />);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'This signup confirmation link is invalid or has expired. Please request a new one.'
  );
  expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
    token_hash: 'test-token',
    type: 'signup',
  });
});
