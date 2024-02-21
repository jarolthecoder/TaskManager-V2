'use client'

import Link from "next/link"
import styles from "./Navigation.module.css"
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

export const Navigation = () => {

  const router = useRouter();
  const currentRoute = usePathname();
  const dispatch = useDispatch()

  const navigateTo = (path) => {
    router.push(path)
  }

  const handleLogout = () => {  
    dispatch(logout())
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.links_list}>
        {navLinks.map(({ path, label, icon }, index) => (
          <li
            key={index}
            className={`${styles.navlink} ${
              currentRoute === path ? styles.active : null
            }`}
            onClick={() => navigateTo(path)}
          >
            <span className="material-icons">{icon}</span>
            <Link href={path}>{label}</Link>
          </li>
        ))}
        <div className={styles.divider}></div>
        <li
          className={`${styles.navlink} ${
            currentRoute === "/login" ? styles.active : null
          }`}
        >
          <span class="material-icons">person</span>
          <Link href="/profile">Profile</Link>
        </li>
        <li
          className={`${styles.navlink} ${
            currentRoute === "/login" ? styles.active : null
          }`}
        >
          <span className="material-icons">settings</span>
          <Link href="/settings">Settings</Link>
        </li>

        <li
          className={`${styles.navlink} ${
            currentRoute === "/login" ? styles.active : null
          }`}
        >
          <span className="material-icons">help</span>
          <Link href="/help">Help</Link>
        </li>
        <li
          className={`${styles.navlink} ${
            currentRoute === "/login" ? styles.active : null
          }`}
          onClick={handleLogout}
        >
          <span className="material-icons">logout</span>
          <Link href="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

const navLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Tasks",
    path: "/dashboard/tasks",
    icon: "view_list",
  },
  {
    label: "Projects",
    path: "/dashboard/projects",
    icon: "folder",
  },
];