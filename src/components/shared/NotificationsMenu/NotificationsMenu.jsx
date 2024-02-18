"use client";

import { NotificationPanel } from "../NotificationPanel/NotificationPanel";
import { useRef } from "react";
import { usePopper } from "@/hooks";
import { IconButton, Popper } from "..";
import styles from "./NotificationsMenu.module.css";

export const NotificationsMenu = () => {
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  return (
    <>
      <div className={styles.notifications} ref={refEl} onClick={togglePopper}>
        <IconButton size="small">
          <span className="material-icons">notifications</span>
        </IconButton>
      </div>
      <Popper open={isPopperOpen} ref={popperRef}>
        <NotificationPanel handleOpen={togglePopper} />
      </Popper>
    </>
  );
};
