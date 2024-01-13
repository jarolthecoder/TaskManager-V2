import { Navigation } from "@/components/dashboard";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <aside className={styles.main}>
      <h2>Sidebar</h2>
      <Navigation />
    </aside>
  );
};
