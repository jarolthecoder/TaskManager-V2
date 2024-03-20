"use client";

import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "@/redux/features/auth";
import { usePopper } from "@/hooks";
import { Menu, MenuItem, Popper } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import userImg from "../../../../public/user-avatar.svg";
import styles from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);
  const { displayName } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <button ref={refEl} className={styles.main} onClick={togglePopper}>
      <div className={styles.user_img_container}>
        <Image src={userImg} alt="user image" width={36} height={36} />
      </div>
      <div className={styles.user}>
        <p className={styles.user_name}>{displayName}</p>
        <p className={styles.user_role}>Admin</p>
      </div>
      <Popper open={isPopperOpen} onClose={togglePopper} ref={popperRef}>
        <Menu>
          {menuItems.map(({ label, path, icon }) => (
            <MenuItem key={label} onClick={togglePopper} icon={icon}>
              <Link href={path}>{label}</Link>
            </MenuItem>
          ))}
          <MenuItem onClick={handleLogout} icon="logout">
            <Link href="/login">Logout</Link>
          </MenuItem>
        </Menu>
      </Popper>
    </button>
  );
};

const menuItems = [
  { label: "Profile", path: "/user", icon: "person" },
  { label: "Settings", path: "/user/settings", icon: "settings" },
];
