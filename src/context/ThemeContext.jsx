"use client";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window?.localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = window?.localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
