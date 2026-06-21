export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;

export function validatePassword(password) {
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return `Password must be ${PASSWORD_MAX_LENGTH} characters or less.`;
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return 'Password must contain lowercase and uppercase letters.';
  }

  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return 'Password must contain at least one special character.';
  }

  return '';
}
