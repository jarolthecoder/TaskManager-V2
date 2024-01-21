"use client";

import { useRef } from "react";
import { Menu, MenuItem } from "..";
import styles from "./UserMenu.module.css";
import { useMenu } from "@/hooks/useMenu";
import Link from "next/link";

export const UserMenu = () => {
  const refEl = useRef();
  const {isMenuOpen, position, handleMenu} = useMenu(refEl);

  return (
    <div className={styles.main}>
      <div className={styles.user_img_container}>
        <p className={styles.user_img}>SU</p>
      </div>
      <div>
        <p className={styles.user_name}>
          Super User
          <span ref={refEl} className="material-icons" onClick={handleMenu}>
            arrow_drop_down
          </span>
        </p>
        <p className={styles.user_role}>Admin</p>
        <Menu open={isMenuOpen} position={position}>
          {menuItems.map(({ label, path, icon }) => (
            <MenuItem key={label} onClick={handleMenu}>
              <span className="material-icons">{icon}</span>
              <Link href={path}>{label}</Link>
            </MenuItem>
          ))}
        </Menu>
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
