import { Card } from "@/components/ui";
import styles from "./StatCard.module.css";
import classNames from "classnames";

export const StatCard = ({ title, icon, stat }) => {
  const statIconClasses = classNames(
    styles.stat_icon_container,
    icon === "today"
      ? styles.due_today
      : icon === "pending_actions"
      ? styles.pending
      : icon === "moving"
      ? styles.in_progress
      : styles.completed
  );

  return (
    <Card className={styles.stat} color="dark">
      <h4 className={styles.stat_title}>{title}</h4>
      <div className={styles.stat_content}>
        <div className={statIconClasses}>
          <span className={`material-icons ${styles.stat_icon}`}>{icon}</span>
        </div>
        <p className={styles.stat_number}>{stat}</p>
      </div>
    </Card>
  );
};
