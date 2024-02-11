
import { Modal } from "@/components/shared";
import { DisplayPanel, SideBar, TopBar } from "@/layout/dashboard";
import { TaskForm } from "@/components/dashboard";
import styles from "./dashboard.module.css";
import { AppProvider } from "@/context/AppContext";

export default function DashboardLayout({ children }) {

  return (
    <AppProvider>
      <main className={styles.main}>
        <Modal title="New Task">
          <TaskForm />
        </Modal>
        <SideBar />
        <TopBar />
        <DisplayPanel>{children}</DisplayPanel>
      </main>
    </AppProvider>
  );
}
