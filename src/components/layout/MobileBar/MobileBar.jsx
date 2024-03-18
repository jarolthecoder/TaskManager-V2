"use client"
import { Navigation } from "@/components/shared";
import styles from "./MobileBar.module.css";
import { useScroll, useWindowSize } from "@/hooks";
import classNames from "classnames";
export const MobileBar = () => {

  const scrollTop = useScroll();
  const {winWidth} = useWindowSize();

  const mobileBarClasses = classNames(
    styles.main,
    scrollTop > 0 && winWidth < 600 
    ? styles.scrolled_down 
    : winWidth < 600 && scrollTop === 0 
    ? styles.scrolled_up 
    : null
  );

  return (
    <div className={mobileBarClasses}>
      <Navigation  />
    </div>
  )
}
