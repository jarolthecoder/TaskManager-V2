import { AddTaskButton, TaskCard } from "..";
import styles from './TasksList.module.css';
import classNames from "classnames";

export const TasksList = ({title, tasks}) => {

  const numOfTasks = tasks.length;

  const numOfTasksClasses = classNames(
    styles.num_of_tasks,
    title === "To Do" && styles.pending,
    title === "In Progress" && styles.in_progress,
    title === "Completed" && styles.completed,
    title === "Unassigned" && styles.unassigned
  )

  return (
    <div className={styles.main}>
      <div className={styles.list_header}>
        <h3>{title}</h3>
        <span className={numOfTasksClasses}>{numOfTasks}</span>
      </div>
      <div className={styles.list_body}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <div className={styles.add_task_btn}>
          <AddTaskButton buttonType="icon" />
        </div>
      </div>
    </div>
  );
}