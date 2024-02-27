import { formatDate } from "date-fns";
import { StatCard } from "..";
import styles from "./StatsOfTheDay.module.css";

export const StatsOfTheDay = ({tasks}) => {
  const formattedToday = formatDate(new Date(), "PP");

  const dueTodayItems = tasks.filter((task) => task.dueDate === formattedToday).length.toString();
  const pendingItems = tasks.filter((task) => task.status === "pending").length.toString();
    const completedItems = tasks
      .filter((task) => task.status === "completed")
      .length.toString();
    
  const inProgressTasks = tasks
    .filter((task) => task.status === "inProgress")
    .length.toString();

  const tasksStatsCard = [
    { title: "Due Today", icon: "today", stat: dueTodayItems },
    {
      title: "Tasks To Do",
      icon: "pending_actions",
      stat: pendingItems,
    },
    {
      title: "Tasks Doing",
      icon: "moving",
      stat: inProgressTasks,
    },
    {
      title: "Tasks Completed",
      icon: "task_alt",
      stat: completedItems,
    },
  ];
  
  return (
    <section className={styles.main}>
      {tasksStatsCard.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          icon={stat.icon}
          stat={stat.stat}
        />
      ))}
    </section>
  );
}