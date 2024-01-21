import {Calendar, ProjectsPreview, TasksPreview } from "@/components/dashboard";
import styles from "./dashboard.module.css";


export default function Dashboard() {
  return (
    <section className={styles.dashboard_container}>
      <div className={styles.col_left}>
        <TasksPreview />
        <ProjectsPreview />
        <Calendar />
     </div>
      <div className={styles.col_right}>
        <Calendar />
      </div>
    </section>
  );
}
