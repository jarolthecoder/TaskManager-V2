"use client";

import Link from "next/link";
import Image from "next/image";
import { use, useRef } from "react";
import { Menu, MenuItem, Popper } from "../../shared";
import { usePopper } from "@/hooks";
import styles from "./UserMenu.module.css";
import userImg from "../../../../public/user-avatar.svg";
import { mockUserData } from "@/api/mockUserData";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);
  const userName = mockUserData.displayName

    const handleLogout = () => {
      dispatch(logout());
    };

  return (
    <button ref={refEl} className={styles.main} onClick={togglePopper}>
      <div className={styles.user_img_container}>
        <Image
          src={userImg}
          alt="user image"
          width={35}
          height={35}
          layout="fixed"
        />
        {/* <p className={styles.user_img}>SU</p> */}
      </div>
      <div>
        <p className={styles.user_name}>{userName}</p>
        <p className={styles.user_role}>Admin</p>
        <Popper open={isPopperOpen} ref={popperRef}>
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
      </div>
    </button>
  );
};

const menuItems = [
  { label: "Profile", path: "/", icon: "person" },
  { label: "Chat", path: "/", icon: "question_answer" },
  { label: "Tasks", path: "/", icon: "list" },
  { label: "Settings", path: "/", icon: "settings" },
];
