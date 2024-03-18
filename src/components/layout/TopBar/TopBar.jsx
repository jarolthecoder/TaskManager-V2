"use client";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { IconButton, Logo, MatIcon, SearchBar } from "@/components/ui";
import { UserBar } from "@/components/user";
import classNames from "classnames";
import styles from "./TopBar.module.css";
import { RenderWhen } from "@/components/shared";
import { useScroll, useWindowSize } from "@/hooks";

export const TopBar = () => {
  const { sidebarOpen, handleSidebar } = useContext(AppContext);
  const { winWidth } = useWindowSize();
  const scrollTop = useScroll();

  const headerClasses = classNames(
    styles.main,
    sidebarOpen ? styles.sidebar_open : styles.sidebar_closed,
    scrollTop > 0 && winWidth < 600 
    ? styles.scrolled_down 
    : winWidth < 600 && scrollTop === 0 
    ? styles.scrolled_up 
    : null
  );

  return (
    <header className={headerClasses}>
      <div className={styles.col_left}>
        <RenderWhen condition={winWidth < 601}>
          <Logo displayText={false} className={styles.topbar_logo} />
        </RenderWhen>
        <IconButton
          className={styles.sidebar_toggle_btn}
          size="small"
          onClick={handleSidebar}
        >
          <MatIcon iconName="menu" />
        </IconButton>
        <RenderWhen condition={winWidth > 601}>
          <SearchBar />
        </RenderWhen>
      </div>
      <div className={styles.col_right}>
        <UserBar />
      </div>
    </header>
  );
};
