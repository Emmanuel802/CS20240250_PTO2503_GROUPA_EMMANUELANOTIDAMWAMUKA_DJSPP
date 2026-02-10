/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";

/**
 * ThemeContext - Manages light/dark mode theme for the entire app
 * Stores the user's theme preference in localStorage so it persists
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider - Wraps the app and provides theme functionality
 * Checks localStorage on mount to remember user's theme choice
 *
 * @param {{children: React.ReactNode}} props
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children }) {
  // Get saved theme from localStorage, default to "dark"
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme || "dark";
  });

  // When theme changes, update localStorage and the document's class
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    // Add theme class to document root so CSS can use it
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  // Function to toggle between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const contextValue = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
