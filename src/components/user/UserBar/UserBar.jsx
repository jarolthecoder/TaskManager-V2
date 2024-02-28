"use client"

import { useContext } from "react";
import { ThemeContext } from "@/context";
import { IconButton, LanguageMenu, MatIcon, NotificationsMenu } from "@/components/shared";
import { UserMenu } from "../UserMenu/UserMenu";
import styles from "./UserBar.module.css";

export const UserBar = () => {
 const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div className={styles.main}>
      <LanguageMenu />
      <IconButton size="small" onClick={toggleTheme}>
        <MatIcon
          iconName={"light_mode"}
          style={{
            color: theme === "light" && "var(--clr-warning-main)",
          }}
        />
      </IconButton>
      <NotificationsMenu />
      <UserMenu />
    </div>
  );
};
