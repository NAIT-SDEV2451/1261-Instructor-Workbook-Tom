import { createContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  getMe,
  loginUser,
  registerUser,
  refreshAccessToken,
} from "../api/auth";
import { setAuthCallBacks } from "../api/client";
import {
  clearStoredTokens,
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setStoredUser,
  getStoredUser,
} from "../api/tokenStorage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [accessToken, setAccessTokenState] = useState(() => getAccessToken());

  const clearAuthState = () => {
    setUser(null);
    setAccessTokenState(null);
    clearStoredTokens();
  };

  function logout() {
    clearAuthState();
  }

  useEffect(() => {
    //define the functions for onTokenRefresh and onLogout
    async function onTokenRefresh() {
      const refresh = getRefreshToken();
      if (!refresh) throw new Error("No Refresh TOken");

      const res = await refreshAccessToken({ refresh });
      if (!res.ok) throw new Error("Token Refresh Failed");

      const data = await res.json();

      // update local storage and the context
      setAccessToken(data.access);
      setAccessTokenState(data.access);

      return data.access;
    }

    function onLogout() {
      clearAuthState();
      window.location.href = "/login";
    }
    // register those callbacks in the client.js file
    setAuthCallBacks({ onTokenRefresh, onLogout });
  }, []);

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await registerUser(userData);

      if (!res.ok) {
        const err = await res.json();
        // DRF validation errors look like this: {'username': ['error reason']}
        // we will only show the first error
        const firstError = Object.values(err)[0];
        throw new Error(
          Array.isArray(firstError) ? firstError[0] : "Registration Failed",
        );
      }

      return res.json();
    },
  });

  // Token comes in base 64 encoded. We need to decode it to a plain string first
  // f7u89sdaf89ioafs.afsd89jkhadfuhk.adsf8913hjkg837
  function parseJWTPayload(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      // malformed tokens return null
      return null;
    }
  }

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      // login the user
      const res = await loginUser(credentials);

      // verify everything went ok
      if (!res.ok) {
        const err = await res.json();
        // DRF returns { "detail": "No active account found..." } for bad credentials.
        throw new Error(err.detail ?? "Login Failed");
      }

      // store the tokens
      // {'access': ..., 'refresh': ...}
      const tokens = await res.json();

      // getMe requires authentication, so we need to store the access token at minimum before requesting it
      setAccessToken(tokens.access);

      // Fetch user details to return
      const meRes = await getMe();
      const me = meRes.ok ? await meRes.json() : null;

      return { tokens, me };
    },
    onSuccess: ({ tokens, me }) => {
      // extract user id from tokens (sent by getMe as well, but for demo purposes grabbing from JWT payload)
      const payload = parseJWTPayload(tokens.access);
      const newUser = payload
        ? {
            id: payload.user_id,
            username: me?.username ?? "",
            role: me?.role ?? "user",
          }
        : null;

      // update the state so that the context holds the necessary values
      setUser(newUser);
      setAccessTokenState(tokens.access);

      // update local storage so tokens persist between sessions
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
      if (newUser) setStoredUser(newUser);
    },
  });

  const value = {
    // This is all the stuff that gets provided to the tree from AuthProvider
    user,
    accessToken,
    logout,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
