
import { Modal } from "@/components/shared";
import { DisplayPanel, SideBar, TopBar } from "@/layout/dashboard";
import { AppProvider } from "@/context/AppContext";
import { AddTaskForm } from "@/components/tasks";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {

  return (
    <AppProvider>
      <main className={styles.main}>
        <Modal title="New Task">
          <AddTaskForm />
        </Modal>
        <SideBar />
        <TopBar />
        <DisplayPanel>{children}</DisplayPanel>
      </main>
    </AppProvider>
  );
}
