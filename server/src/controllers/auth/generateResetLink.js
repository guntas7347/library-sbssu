/**
 * Generates a unique password reset link.
 * @param {string} baseUrl - The base URL for the reset link (e.g., "https://yourapp.com/reset-password?code=").
 * @returns {{code: string, link: string}} An object containing the unique code and the full reset link.
 */
export const generateResetLink = (baseUrl) => {
  const code = crypto.randomUUID();
  const link = `${baseUrl}${code}`;
  return { code, link };
};
