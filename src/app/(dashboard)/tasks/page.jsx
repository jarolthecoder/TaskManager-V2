"use client"
import { useState } from "react";
import { Breadcrumbs, MatIcon, RenderWhen } from "@/components/shared";
import { AddTaskButton, TasksBoard, TasksList  } from "@/components/tasks";
import styles from "./tasksPage.module.css";

export default function TasksPage() {

  const preferedTaskView = window?.localStorage.getItem("prefered-task-view");

  const [selectedView, setSelectedView] = useState(preferedTaskView || "board");

  const handleSelectedView = (view) => {
    setSelectedView(view);
    window?.localStorage.setItem("prefered-task-view", view);
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
          fallback={<TasksList />}
        >
          <TasksBoard />
        </RenderWhen>
      </div>
    </section>
  );
}
