"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context";
import { IconButton, MatIcon } from "@/components/ui";

export const ThemeToggle = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <IconButton size="small" onClick={toggleTheme}>
      <MatIcon
        iconName={"light_mode"}
        style={{
          color: theme === "light" && "var(--clr-warning-main)",
        }}
      />
    </IconButton>
  );
};
