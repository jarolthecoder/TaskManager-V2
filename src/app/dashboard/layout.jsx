
import { DisplayPanel, SideBar, TopBar } from "@/layout/dashboard";
import { AppProvider } from "@/context/AppContext";
import styles from "./dashboard.module.css";
import { TaskActionsModal } from "@/components/tasks/";

export default function DashboardLayout({ children }) {

  return (
    <AppProvider>
      <main className={styles.main}>
        <SideBar />
        <TopBar />
        <DisplayPanel>{children}</DisplayPanel>
      </main>
      {/* Modals */}
      <TaskActionsModal />
    </AppProvider>
  );
}
