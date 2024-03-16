"use client"

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Logo, Navigation } from "@/components/shared";
import classNames from "classnames";
import styles from "./SideBar.module.css";

export const SideBar = () => {
  const { sidebarOpen } = useContext(AppContext);

  const sidebarClasses = classNames(
    styles.main,
    sidebarOpen ? styles.open : styles.closed
  )

  return (
    <aside className={sidebarClasses}>
      <Logo displayText={sidebarOpen} />
      <Navigation sidebarOpen={sidebarOpen} />
    </aside>
  );
};
