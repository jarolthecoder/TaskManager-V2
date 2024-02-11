import {
  Calendar,
  ProjectsPreview,
  TasksPreview,
  DoughnutChart,
} from "@/components/dashboard";
import { Card } from "@/components/shared";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <h2>Dashboard Overview</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.col_left}>
          <TasksPreview />
          <ProjectsPreview />
        </div>
        <div className={styles.col_right}>
          <Card className={styles.calendar_card}>
            <Calendar />
          </Card>
          <Card>
            <h2>Task's completition status</h2>
              <DoughnutChart />
          </Card>
        </div>
      </div>
    </section>
  );
}
