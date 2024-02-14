import { Card } from "@/components/shared";
import styles from "./TaskStatCard.module.css";
import classNames from "classnames";

export const TaskStatCard = ({ title, icon, stat }) => {
  const statIconClasses = classNames(
    styles.stat_icon,
    icon === "today"
      ? styles.due_today
      : icon === "trending_up"
      ? styles.in_progress
      : styles.pending
  );

  return (
    <Card className={styles.stat}>
      <h3 className={styles.stat_title}>{title}</h3>
      <div className={styles.stat_content}>
        <div className={statIconClasses}>
          <span class="material-icons">{icon}</span>
        </div>
        <p className={styles.stat_number}>{stat}</p>
      </div>
    </Card>
  );
};
