import {  Logo, Navigation } from "@/components/shared";
import { AddTaskButton } from "@/components/tasks";
import styles from "./SideBar.module.css";

export const SideBar = () => {
  return (
    <aside className={styles.main}>
      <Logo />
      <Navigation />
      {/* <div className={styles.add_task_container}>
        <AddTaskButton />
      </div> */}
    </aside>
  );
};
