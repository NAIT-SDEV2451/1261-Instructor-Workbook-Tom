import { getAccessToken, getRefreshToken } from "./tokenStorage";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

// Once authprovider mounts, it will set these callbacks
// This allows them to work even though the client itself has no React dependency
let _onTokenRefresh = null;
let _onLogout = null;

export function setAuthCallBacks({ onTokenRefresh, onLogout }) {
  _onTokenRefresh = onTokenRefresh;
  _onLogout = onLogout;
}

// This is used for debouncing refresh token requests
let _refreshPromise = null;

export default async function apiFetch(endpoint, options = {}) {
  // first load the token from local storage
  const token = getAccessToken();

  // create the headers with the token

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // then make a fetch, passing through the options and adding the token
  let res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // if access token expired, but we have one, and we have a way to refresh it
  if (res.status === 401 && getAccessToken() && _onTokenRefresh) {
    try {
      // debounce the refresh request
      if (!_refreshPromise) {
        // Only if there is no refresh in flight do we ask for a new token
        _refreshPromise = _onTokenRefresh().finally(() => {
          // clear out the refresh promise so we can make the request again
          _refreshPromise = null;
        });
      }
      const newAccessToken = await _refreshPromise;

      // Then remake the initial request with the new access token
      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    } catch {
      // the refresh failed, log me out
      _onLogout?.();
    }
  }

  return res;
}
