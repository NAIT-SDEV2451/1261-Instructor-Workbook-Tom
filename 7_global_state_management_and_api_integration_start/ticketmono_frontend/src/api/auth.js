import apiFetch from "./client";

export async function refreshAccessToken({ refresh }) {
  return apiFetch(`/auth/token/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });
}

export async function getMe() {
  return apiFetch("/auth/me");
}

export async function loginUser({ username, password }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function registerUser({ username, password, email, role }) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password, email, role }),
  });
}
