"use client"
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { IconButton, MatIcon, SearchBar } from "@/components/shared";
import { UserBar } from "@/components/user";
import classNames from "classnames";
import styles from "./TopBar.module.css";

export const TopBar = () => {

  const {sidebarOpen, handleSidebar} = useContext(AppContext);

  const headerClasses = classNames(
    styles.main,
    sidebarOpen ? styles.sidebar_open : styles.sidebar_closed
  )

  return (
    <header className={headerClasses}>
      <div className={styles.col_left}>
        <IconButton size="small" onClick={handleSidebar}>
          <MatIcon iconName="menu" /> 
        </IconButton>
        <SearchBar />
      </div>
      <div className={styles.col_right}>
        <UserBar />
      </div>
    </header>
  );
};
