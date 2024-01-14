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
        {navLinks.map(({ path, title, linkIcon }, index) => (
          <li
            key={index}
            className={`${styles.navlink} ${
              currentRoute === path ? styles.active : null
            }`}
            onClick={() => navigateTo(path)}
          >
            <span className="material-icons">{linkIcon}</span>
            <Link href={path}>{title}</Link>
          </li>
        ))}
        
      </ul>
    </nav>
  );
}

const navLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    linkIcon: "dashboard",
  },
  {
    title: "Tasks",
    path: "/dashboard/tasks",
    linkIcon: "view_list",
  },
  {
    title: "Projects",
    path: "/dashboard/projects",
    linkIcon: "folder",
  },
];