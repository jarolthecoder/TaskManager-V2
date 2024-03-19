"use client";
import { Navigation, RenderWhen } from "@/components/shared";
import styles from "./MobileBar.module.css";
import { useScroll, useWindowSize } from "@/hooks";
import classNames from "classnames";
export const MobileBar = () => {
  const scrollTop = useScroll();
  const { winWidth } = useWindowSize();

  const mobileBarClasses = classNames(
    styles.main,
    scrollTop && winWidth < 600 
    ? styles.visible
    : styles.hidden
  );

  return (
    <RenderWhen condition={winWidth < 601}>
      <div className={mobileBarClasses}>
        <Navigation />
      </div>
    </RenderWhen>
  );
};
