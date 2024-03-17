"use client"
import { useState } from "react";
import { Breadcrumbs, MatIcon, RenderWhen } from "@/components/shared";
import { AddTaskButton, TasksBoard, TasksList  } from "@/components/tasks";
import styles from "./tasksPage.module.css";
import { useSelector } from "react-redux";
import { selectAllProjects } from "@/redux/features/projects";

export default function TasksPage() {
  
  const projects = useSelector(selectAllProjects);
  const allTasks = projects.flatMap((project) => project.tasks);
  const preferedTaskView = localStorage.getItem("prefered-task-view");

  const [selectedView, setSelectedView] = useState(preferedTaskView || "board");

  const handleSelectedView = (view) => {
    setSelectedView(view);
    localStorage.setItem("prefered-task-view", view);
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs />
          <h2>Tasks</h2>
        </div>
        <div className={styles.header_options}>
          <p
            className={`${styles.view_btn} ${
              selectedView === "board" ? styles.active : ""
            }`}
            onClick={() => handleSelectedView("board")}
          >
            <MatIcon iconName="calendar_view_week" />
            Board
          </p>
          <p
            className={`${styles.view_btn} ${
              selectedView === "list" ? styles.active : ""
            }`}
            onClick={() => handleSelectedView("list")}
          >
            <MatIcon iconName="format_list_bulleted" />
            List
          </p>
          <AddTaskButton />
        </div>
      </div>
      <div className={styles.container}>
        <RenderWhen
          condition={selectedView === "board"}
          fallback={<TasksList tasks={allTasks}/>}
        >
          <TasksBoard />
        </RenderWhen>
      </div>
    </section>
  );
}
