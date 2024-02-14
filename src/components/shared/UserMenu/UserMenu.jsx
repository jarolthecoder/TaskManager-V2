"use client";

import { useRef } from "react";
import { Menu, MenuItem, Popper } from "..";
import Link from "next/link";
import { usePopper } from "@/hooks";
import styles from "./UserMenu.module.css";

export const UserMenu = () => {
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  return (
    <div ref={refEl} className={styles.main}>
      <div className={styles.user_img_container}>
        <p className={styles.user_img}>SU</p>
      </div>
      <div>
        <p className={styles.user_name}>
          Super User
          <span className="material-icons" onClick={togglePopper}>
            arrow_drop_down
          </span>
        </p>
        <p className={styles.user_role}>Admin</p>
        <Popper open={isPopperOpen} ref={popperRef}>
          <Menu>
            {menuItems.map(({ label, path, icon }) => (
              <MenuItem key={label} onClick={togglePopper}>
                <span className="material-icons">{icon}</span>
                <Link href={path}>{label}</Link>
              </MenuItem>
            ))}
          </Menu>
        </Popper>
      </div>
    </div>
  );
};

const menuItems = [
  { label: "Profile", path: "/", icon: "person" },
  { label: "Chat", path: "/", icon: "question_answer" },
  { label: "Tasks", path: "/", icon: "list" },
  { label: "Settings", path: "/", icon: "settings" },
  { label: "Logout", path: "/login", icon: "logout" },
];
