import { AddTaskButton } from "@/components/dashboard";
import { Card, Logo, Navigation } from "@/components/shared";
import styles from "./SideBar.module.css";

export const SideBar = () => {
  return (
    <aside className={styles.main}>
      <Logo />
      <Navigation />
      <div className={styles.add_task_container}>
        <Card>
          <AddTaskButton />
        </Card>
      </div>
    </aside>
  );
};
