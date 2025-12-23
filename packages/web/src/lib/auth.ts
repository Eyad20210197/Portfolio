// This file could contain client-side authentication utilities,
// such as functions to get/set/remove tokens, or check authentication status.
// For Next.js App Router with HttpOnly cookies, much of this is handled by middleware.
// However, client-side logout or local auth state management would go here.

export const logout = async () => {
  // Call backend logout endpoint to clear HttpOnly cookie
  await fetch('/api/v1/auth/logout', { method: 'POST' });
  // Redirect to login or home page
  window.location.href = '/login';
};

export const isAuthenticatedClient = (): boolean => {
  // With HttpOnly cookies, true client-side check is difficult without an API call.
  // This function might be used to optimistically show/hide UI elements,
  // but definitive auth check should always happen on the server/middleware.
  // For now, it's a placeholder.
  return false; // Or check for a non-HttpOnly cookie if present (less secure)
};
