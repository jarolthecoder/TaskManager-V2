import { Card } from "@/components/shared"
import { AddTaskButton } from "..";
import { tasksData } from "@/api/tasksData";
import { TaskItem } from "../TaskItem/TaskItem";
import styles from "./TasksPreview.module.css";

export const TasksPreview = () => {
  const tasksList = tasksData;
  return (
    <section className={styles.main}>
      {tasksList.map((task) => {
        return (
          <TaskItem key={task.id} task={task} />
        );
      })}
      <Card>
        <div className={styles.add_task_btn}>
          <AddTaskButton />
        </div>
      </Card>
    </section>
  );
}