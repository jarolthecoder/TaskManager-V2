import { Navigation } from "@/components/dashboard";
import styles from "./Sidebar.module.css";
import { Logo } from "@/components/shared";

export const Sidebar = () => {
  return (
    <aside className={styles.main}>
      <Logo />
      <Navigation />
    </aside>
  );
};
