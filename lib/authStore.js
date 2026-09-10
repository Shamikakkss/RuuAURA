"use client";
import { useState, useEffect } from "react";

export const AUTH_STORAGE_KEY = "ruuaura_auth";
export const AUTH_EVENT_KEY = "ruuaura_auth_change";

export const DEFAULT_USER = {
  name: "Jane Sterling",
  email: "jane.sterling@example.com",
  phone: "+94 77 123 4567",
  whatsapp: "+94 77 123 4567",
  initials: "JS",
  tier: "Sanctuary Member",
  memberSince: "2024",
};

export function getStoredAuth() {
  if (typeof window === "undefined") {
    return { isLoggedIn: true, user: DEFAULT_USER };
  }
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      // Initialize with default logged-in demo state
      const initial = { isLoggedIn: true, user: DEFAULT_USER };
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return { isLoggedIn: true, user: DEFAULT_USER };
  }
}

export function setStoredAuth(authState) {
  if (typeof window === "undefined") return authState;
  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    window.dispatchEvent(new CustomEvent(AUTH_EVENT_KEY, { detail: authState }));
  } catch (err) {
    console.error("Failed to save auth state", err);
  }
  return authState;
}

export function loginUser(customUser) {
  const newState = {
    isLoggedIn: true,
    user: { ...DEFAULT_USER, ...(customUser || {}) },
  };
  return setStoredAuth(newState);
}

export function logoutUser() {
  const newState = {
    isLoggedIn: false,
    user: DEFAULT_USER,
  };
  return setStoredAuth(newState);
}

export function updateUserProfile(updates) {
  const current = getStoredAuth();
  const newState = {
    ...current,
    user: { ...current.user, ...updates },
  };
  return setStoredAuth(newState);
}

/**
 * Custom React hook for synced authentication state across components and tabs
 */
export function useAuth() {
  const [auth, setAuth] = useState(() => getStoredAuth());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuth(getStoredAuth());

    const handleAuthChange = () => {
      setAuth(getStoredAuth());
    };

    window.addEventListener(AUTH_EVENT_KEY, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_EVENT_KEY, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return {
    isLoggedIn: mounted ? auth.isLoggedIn : true,
    user: auth.user || DEFAULT_USER,
    login: loginUser,
    logout: logoutUser,
    updateProfile: updateUserProfile,
    mounted,
  };
}
