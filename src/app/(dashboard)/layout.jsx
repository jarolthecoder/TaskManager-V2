"use client";

import { AppProvider, ThemeProvider } from "@/context";
import { TaskActionsModal } from "@/components/tasks/";
import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks";
import { useEffect } from "react";
import styles from "./dashboard.module.css";
import { PageLoader } from "@/components/shared";
import { ProjectActionsModal } from "@/components/projects";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "@/firebase/config";
import { DisplayPanel, SideBar, TopBar } from "@/layout/dashboard";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const status = useCheckAuth();

   const [user, loading] = useAuthState(FirebaseAuth);

   if(loading) {
    return <PageLoader />;
   }

  if (!user) {
    router.push("/login");
    return <PageLoader />;
  }

    // useEffect(() => {
    //   if (status === "non-authenticated") router.push("/login");
    // }, [status]);

    // if (status !== "authenticated") {
    //   return <PageLoader />;
    // }
   

  // useEffect(() => {
  //   if (status === "non-authenticated") router.push("/login");
  // }, [status]);

  // if (status !== "non-authenticated") {
  //   router.push("/login");
  //   return <PageLoader />;
  // }

  // if (status !== "authenticated") {
  //   return <PageLoader />;
  // }

  return (
    <AppProvider>
      <ThemeProvider>
        <main className={styles.main}>
          <SideBar />
          <TopBar />
          <DisplayPanel>{children}</DisplayPanel>
        </main>
        {/* Modals */}
        <TaskActionsModal />
        <ProjectActionsModal />
      </ThemeProvider>
    </AppProvider>
  );
}
