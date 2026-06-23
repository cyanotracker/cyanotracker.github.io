const resetPasswordMarker = '?reset-password=1';

export function getResetPasswordFallbackPath(locationObject = window.location) {
  const { search = '', hash = '' } = locationObject;

  if (
    search !== resetPasswordMarker &&
    !search.startsWith(`${resetPasswordMarker}&`)
  ) {
    return null;
  }

  const remainder = search.slice(resetPasswordMarker.length);
  const normalizedSearch = remainder.startsWith('&') ? `?${remainder.slice(1)}` : remainder;

  return `/reset-password${normalizedSearch}${hash}`;
}
