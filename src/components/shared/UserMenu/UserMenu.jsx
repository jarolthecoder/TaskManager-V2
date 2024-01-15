"use client";

import { Menu, MenuItem } from "..";
import styles from "./UserMenu.module.css";
import { useMenu } from "@/hooks/useMenu";

export const UserMenu = () => {
  const {isMenuOpen, handleMenu} = useMenu();

  return (
    <div className={styles.main}>
      <div className={styles.user_img_container}>
        <p className={styles.user_img}>SU</p>
      </div>
      <div>
        <p className={styles.user_name}>
          Super User
          <span className="material-icons" onClick={handleMenu}>
            arrow_drop_down
          </span>
        </p>
        <p className={styles.user_role}>Admin</p>
        <Menu open={isMenuOpen}>
          {menuItems.map(({ label, icon }) => (
            <MenuItem key={label} onClick={handleMenu}>
              <span className="material-icons">{icon}</span>
              {label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

const menuItems = [
  { label: "Profile", icon: "person" },
  { label: "Chat", icon: "question_answer" },
  { label: "Tasks", icon: "list" },
  { label: "Settings", icon: "settings" },
  { label: "Logout", icon: "logout" },
];
