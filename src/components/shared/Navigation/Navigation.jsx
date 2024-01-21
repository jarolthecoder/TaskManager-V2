'use client'

import Link from "next/link"
import styles from "./Navigation.module.css"
import { usePathname, useRouter } from "next/navigation";

export const Navigation = () => {

  const router = useRouter();
  const currentRoute = usePathname();

  const navigateTo = (path) => {
    router.push(path)
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
          onClick={() => navigateTo("/login")}
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