import { Breadcrumbs } from "@/components/shared";
import { AddTaskButton, TasksBoard  } from "@/components/tasks";
import styles from "./tasksPage.module.css";

export default function TasksPage() {

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs />
          <h2>Tasks</h2>
        </div>
        <div className={styles.header_options}>
          <AddTaskButton />
        </div>
      </div>
      <div className={styles.container}>
        <TasksBoard />
      </div>
    </section>
  );
}
