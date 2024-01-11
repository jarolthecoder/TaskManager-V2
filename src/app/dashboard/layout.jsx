import styles from "./dashboard.module.css";
import { DisplayPanel, Sidebar, Topbar } from "@/layout/dashboard";

export default function DashboardLayout({ children }) {
  return (
    <main className={styles.main}>
      <Sidebar />
      <Topbar />
      <DisplayPanel>{children}</DisplayPanel>
    </main>
  );
}
