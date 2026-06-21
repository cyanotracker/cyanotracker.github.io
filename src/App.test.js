import { getAppDeepLink, isMobileDevice } from './pages/AuthConfirmed';

test('preserves query and hash parameters in the app deep link', () => {
  expect(
    getAppDeepLink({
      search: '?type=signup&next=%2Fhome',
      hash: '#access_token=secret&refresh_token=secret-two',
    })
  ).toBe(
    'com.chintan.cyanotracker://auth-confirmed?type=signup&next=%2Fhome#access_token=secret&refresh_token=secret-two'
  );
});

test('detects mobile and desktop devices', () => {
  expect(isMobileDevice({ userAgent: 'Mozilla/5.0 (iPhone)', platform: 'iPhone' })).toBe(true);
  expect(isMobileDevice({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64)', platform: 'Linux' })).toBe(false);
});
