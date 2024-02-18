"use client";

import { useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "@/context/AppContext";
import { TASKS } from "@/lib/constants";
import { formatDate } from "@/utils/helpers/formatDate";
import { Button } from "@/components/shared";
import { TasksList } from "@/components/tasks";
import styles from "./tasksPage.module.css";

const { ADD } = TASKS;
const formattedToday = formatDate(new Date(), "PP");

export default function TasksPage() {
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);
  const tasks = useSelector((state) => state.tasks.tasksList);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );
  const dueTodayTasks = tasks.filter(
    (task) => task.dueDate === formattedToday
  );
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );
  const unAssignedTasks = tasks.filter(
    (task) => task.projectAssigned === ""
  );

  const inProgressTasks = tasks.filter( 
    (task) => task.status === "In progress"
  );

  const handleAddTask = () => {
    setSelectedTaskAction(ADD);
    handleTaskModal();
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <h2>Tasks</h2>
        <div className={styles.header_options}>
          <Button
            fullWidth
            label="Add New Task"
            color="accent"
            size="small"
            startIcon={<span className="material-icons">add</span>}
            onClick={handleAddTask}
          />
        </div>
      </div>
      <div className={styles.container}>
        <TasksList title="To Do" tasks={pendingTasks} />
        <TasksList title="In Progress" tasks={inProgressTasks} />
        <TasksList title="Completed" tasks={completedTasks} />
        <TasksList title="Unassigned" tasks={unAssignedTasks} />
      </div>
    </section>
  );
}
