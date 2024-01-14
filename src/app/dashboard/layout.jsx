import styles from "./dashboard.module.css";
import { DisplayPanel, SideBar, TopBar } from "@/layout/dashboard";

export default function DashboardLayout({ children }) {
  return (
    <main className={styles.main}>
      <SideBar />
      <TopBar />
      <DisplayPanel>{children}</DisplayPanel>
    </main>
  );
}
