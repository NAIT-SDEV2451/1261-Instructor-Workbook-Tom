const ACCESS_KEY = "ticketmono_access";
const REFRESH_KEY = "ticketmono_refresh";
const USER_ID_KEY = "ticketmono_user_id";
const USERNAME_KEY = "ticketmono_username";
const ROLE_KEY = "ticketmono_role";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}
export function setAccessToken(value) {
  return localStorage.setItem(ACCESS_KEY, value);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function setRefreshToken(value) {
  return localStorage.setItem(REFRESH_KEY, value);
}

export function getStoredUser() {
  const id = localStorage.getItem(USER_ID_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  const role = localStorage.getItem(ROLE_KEY);
  return id && username ? { id: Number(id), username, role } : null;
}

export function setStoredUser({ id, username, role }) {
  localStorage.setItem(USER_ID_KEY, id);
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(ROLE_KEY, role);
}

export function clearStoredTokens() {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
