"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MatIcon } from "@/components/ui";
import { RenderWhen } from "..";
import { useWindowSize } from "@/hooks";
import { navigation } from "@/lib";
import styles from "./Navigation.module.css";

export const Navigation = ({ sidebarOpen }) => {
  const router = useRouter();
  const currentRoute = usePathname();
  const segments = currentRoute.split("/").filter((segment) => segment !== "");
  const { winWidth } = useWindowSize();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.links_list}>
        {navigation.map(({ path, label, icon }, index) => {
          // Extracting the last segment and removing any "/" characters for dynamic routes check
          const lastSegment = path.split("/").pop().replace("/", "");
          const isLinkActive = segments.includes(lastSegment) || currentRoute === path;
          return (
            <li
              key={index}
              className={`${styles.navlink} ${
                isLinkActive
                  ? styles.active
                  : null
              }`}
              onClick={() => navigateTo(path)}
            >
              <MatIcon iconName={icon} />
              <RenderWhen condition={sidebarOpen || winWidth < 600}>
                <Link href={path}>{label}</Link>
              </RenderWhen>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
