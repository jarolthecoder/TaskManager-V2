"use client"
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import classNames from "classnames";
import styles from "./DisplayPanel.module.css";

export const DisplayPanel = ({ children }) => {
  const { sidebarOpen } = useContext(AppContext);

  const displayClasses = classNames(
    styles.main,
    sidebarOpen ? styles.sidebar_open : styles.sidebar_closed
  );
  
  return (
    <>
      <article className={displayClasses}>
        {children}
      </article>
    </>
  );
};
