// In dev we proxy `/api/*` to the backend (see `vite.config.ts`) so that
// refresh cookies (HttpOnly) behave as same-site and avoid CORS headaches.
export const API_BASE_URL_APP =
  import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? '/api/' : '/api/')

// Authentification
export const AUTH_SIGN_UP = 'accounts/register/'
export const AUTH_SIGN_IN = 'accounts/login/'
export const VERIFY_OTP = 'accounts/verify-otp/'
export const LOGOUT = 'accounts/logout/'
// NOTE: adapte cette route selon ton backend
export const DELETE_ACCOUNT = 'accounts/delete/'

// Session refresh (refresh token in HttpOnly cookie)
// NOTE: adapte cette route selon ton backend
export const AUTH_REFRESH = 'accounts/refresh/'
