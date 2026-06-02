"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "standard" | "admin";
}

// Define what credentials your backend expects
interface LoginCredentials {
  email: string;
  /* add password or tokens here if needed */
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Added to handle loading states
  error: string | null; // Added to handle API errors
  login: (credentials: LoginCredentials) => Promise<void>; // Now returns a Promise
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Make the actual network request to your backend API
      const response = await fetch("https://your-api-url.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }

      // 2. Parse the user data returned by your backend
      const data: User = await response.json();

      // 3. Save it to your React state
      setUser(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err; // Re-throw so the UI component can handle it if needed
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Optional: Clear tokens from localStorage/cookies here if your backend uses them
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      error,
      login,
      logout,
    }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}