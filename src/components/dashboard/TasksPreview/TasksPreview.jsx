import { Card, IconButton, PriorityBadge } from "@/components/shared"
import { AddTaskButton } from "..";
import styles from "./TasksPreview.module.css";

export const TasksPreview = () => {
  return (
    <section className={styles.main}>
      {tasksList.map((task) => {
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
      })}
      <Card>
        <div className={styles.add_task_btn}>
          <AddTaskButton />
        </div>
      </Card>
    </section>
  );
}

const tasksList = [
  {
    id: 1,
    title: "Design Meeting",
    priority: "high",
    description:
      "Development task assign forn the product page with the design team",
  },
  {
    id: 2,
    title: "Client Meeting",
    priority: "medium",
    description:
      "Development task assign forn the product page with the design team",
  },
  {
    id: 3,
    title: "Dribble Shot",
    priority: "low",
    description:
      "Development task assign forn the product page with the design team",
  },
];
