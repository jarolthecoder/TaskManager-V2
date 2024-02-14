import { Card, IconButton, PriorityBadge, RenderWhen } from "@/components/shared";
import styles from "./TaskItem.module.css";
import classNames from "classnames";

export const TaskItem = ({ task, selectedView, today }) => {
  const { id, title, priority, description, status } = task;

  const taskClasses = classNames(
    selectedView === "List" && styles.list_item,
    task.status === "Completed" && styles.completed
  )
  
  const isDueToday = task.dueDate === today;

  return (
    <Card key={id} className={taskClasses}>
        <div className={styles.task_header}>
          <div className={styles.task_title}>
            <h3>{title}</h3>
          </div>
          <div></div>
        </div>
        <div className={styles.task_body}>
          <p className={styles.task_description}>{description}</p>
          {/* Maybe */}
          {/* <textarea
          placeholder="Add a description..."
          rows="3"
          className={styles.task_description}
        >
          {description}
        </textarea> */}
        </div>
        <div className={styles.task_footer}>
          <div className={styles.task_stat_row}>
            <p>Priority</p>
            <p
              style={{
                color:
                  task.priority === "High"
                    ? "#E17F41"
                    : task.priority === "Medium"
                    ? "#f4c47c"
                    : "#15CAB0",
              }}
            >
              {task.priority}
            </p>
          </div>
          <div className={styles.task_stat_row}>
            <p>Status</p>
            <PriorityBadge priority={status} className={styles.item_priority} />
          </div>
          <div className={styles.task_stat_row}>
            <p>Due Date</p>
            <p>
              { isDueToday ? "Today" : task.dueDate }
            </p>
          </div>
        </div>
      {/* <IconButton icon="more_vert" /> */}
    </Card>
  );
};
