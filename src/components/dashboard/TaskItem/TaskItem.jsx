import { Card, IconButton, PriorityBadge } from "@/components/shared";
import styles from "./TaskItem.module.css"

export const TaskItem = ({task}) => {
  const { id, title, priority, description } = task;
  return (
    <Card key={id}>
      <div className={styles.task_header}>
        <div className={styles.task_title}>
          <h3>{title}</h3>
          <PriorityBadge priority={priority} />
        </div>
        <div>
          <IconButton icon="more_vert" />
        </div>
      </div>
      <div className={styles.task_body}>
        <p className={styles.task_description}>{description}</p>
      </div>
    </Card>
  );
}
