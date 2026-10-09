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

  value = {
    // This is all the stuff that gets provided to the tree from AuthProvider
    user,
    accessToken,
    logout,
    register: registerMutation.mutate,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
