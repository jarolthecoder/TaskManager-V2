"use client";

import { NotificationPanel } from "../NotificationPanel/NotificationPanel";
import { useRef } from "react";
import { usePopper } from "@/hooks";
import { IconButton, MatIcon, Popper } from "..";
import styles from "./NotificationsMenu.module.css";

export const NotificationsMenu = () => {
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  return (
    <>
      <div className={styles.notifications} ref={refEl} onClick={togglePopper}>
        <IconButton size="small">
          <MatIcon iconName="notifications" />
        </IconButton>
      </div>
      <Popper open={isPopperOpen} ref={popperRef}>
        <NotificationPanel handleOpen={togglePopper} />
      </Popper>
    </>
  );
};
