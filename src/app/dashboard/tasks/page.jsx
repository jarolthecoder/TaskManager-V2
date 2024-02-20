"use client";

import { useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "@/context/AppContext";
import { TASK_ACTIONS } from "@/lib/constants";
import { formatDate } from "@/utils/helpers/formatDate";
import { Button } from "@/components/shared";
import { TasksList } from "@/components/tasks";
import styles from "./tasksPage.module.css";

const { ADD_TASK } = TASK_ACTIONS;
const formattedToday = formatDate(new Date(), "PP");

export default function TasksPage() {
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);
  const tasks = useSelector((state) => state.tasks.tasksList);

  // Filtered tasks for columns
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const unAssignedTasks = tasks.filter((task) => task.assignedTo === "Unassigned");
  const inProgressTasks = tasks.filter((task) => task.status === "In progress");
  const dueTodayTasks = tasks.filter((task) => task.dueDate === formattedToday);

  // Task list columns data
  const taskListColumns = [
    { title: "Pending", tasks: pendingTasks },
    { title: "In Progress", tasks: inProgressTasks },
    { title: "Completed", tasks: completedTasks },
    { title: "Unassigned", tasks: unAssignedTasks },
  ];

  const handleAddTask = () => {
    setSelectedTaskAction(ADD_TASK);
    handleTaskModal();
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <h2>Tasks</h2>
        <div className={styles.header_options}>
          <Button
            fullWidth
            label="Add Task"
            color="accent"
            size="small"
            startIcon={<span className="material-icons">add</span>}
            onClick={handleAddTask}
          />
        </div>
      </div>
      <div className={styles.container}>
        {taskListColumns.map((column) => (
          <TasksList
            key={column.title}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </div>
    </section>
  );
}
