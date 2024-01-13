import { ProjectsPreview, TasksPreview } from "@/components/dashboard";
import styles from "./Dashboard.module.css";


export default function Dashboard() {
  return (
    <section className={styles.dashboard_container}>
      <div className={styles.col_left}>
        <TasksPreview />
        <ProjectsPreview />
      </div>
      <div className={styles.col_right}>
        
      </div>
    </section>
  );
}
