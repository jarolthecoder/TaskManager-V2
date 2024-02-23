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
        {/* <footer className={styles.footer}>
          <Card className={styles.footer_content}>
            <p>2024 &copy; TaskManager</p>
            <p>Designed and Developed by Jarol Riera</p>
          </Card>
        </footer> */}
      </article>
    </>
  );
};
