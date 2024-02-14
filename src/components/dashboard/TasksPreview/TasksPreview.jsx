import { Card } from "@/components/shared"
import { AddTaskButton } from "..";
import { tasksData } from "@/api/tasksData";
import { TaskItem } from "../../tasks/TaskItem/TaskItem";
import styles from "./TasksPreview.module.css";

export const TasksPreview = () => {
  const tasksList = tasksData;
  
  return (
    <section className={styles.main}>
      <Card className={styles.stat}>
        <h3 className={styles.stat_title}>Due Today</h3>
        <div className={styles.stat_content}>
          <div className={`${styles.stat_icon} ${styles.due_today}`}>
            <span class="material-icons">today</span>
          </div>
          <p className={styles.stat_number}>1</p>
        </div>
      </Card>
      <Card className={styles.stat}>
        <h3 className={styles.stat_title}>In Progress Tasks</h3>
        <div className={styles.stat_content}>
          <div className={`${styles.stat_icon} ${styles.in_progress}`}>
            <span class="material-icons">trending_up</span>
          </div>
          <p className={styles.stat_number}>8</p>
        </div>
      </Card>
      <Card className={styles.stat}>
        <h3 className={styles.stat_title}>Pending Tasks</h3>
        <div className={styles.stat_content}>
          <div className={`${styles.stat_icon} ${styles.pending}`}>
            <span class="material-icons">pending_actions</span>
          </div>
          <p className={styles.stat_number}>5</p>
        </div>
      </Card>
      {/* {tasksList.map((task) => {
        return (
          <TaskItem key={task.id} task={task} />
        );
      })} */}

      {/* <div className={styles.add_task_btn}>
          <AddTaskButton />
        </div> */}
    </section>
  );
}