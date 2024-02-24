"use client";
import { DisplayPanel, SideBar, TopBar } from "@/layout/dashboard";
import { AppProvider } from "@/context/AppContext";
import { TaskActionsModal } from "@/components/tasks/";
import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks";
import { useEffect } from "react";
import styles from "./dashboard.module.css";
import { PageLoader } from "@/components/shared";
import { ProjectActionsModal } from "@/components/projects";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const status = useCheckAuth();

  useEffect(() => {
    if (status === "non-authenticated") router.push("/login");
  }, [status]);

  if (status !== "authenticated") {
    return <PageLoader />;
  }

  return (
    <AppProvider>
      <main className={styles.main}>
        <SideBar />
        <TopBar />
        <DisplayPanel>{children}</DisplayPanel>
      </main>
      {/* Modals */}
      <TaskActionsModal />
      <ProjectActionsModal />
    </AppProvider>
  );
}
