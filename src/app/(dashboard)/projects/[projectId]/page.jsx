"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProjectById,
  selectProject,
  setSelectedProject,
} from "@/redux/features/projects";
import { Breadcrumbs, MatIcon, RenderWhen } from "@/components/shared";
import { AddTaskButton, TasksBoard, TasksList } from "@/components/tasks";
import styles from "./projectPage.module.css";

export default function ProjectPage({ params }) {
  const dispatch = useDispatch();

  const selectedProject = useSelector(selectProject);
  const projectTitle = selectedProject?.title;

  const preferedTaskView = localStorage.getItem("prefered-task-view");
  const [selectedView, setSelectedView] = useState(preferedTaskView || "board");

  const handleSelectedView = (view) => {
    setSelectedView(view);
    localStorage.setItem("prefered-task-view", view);
  };

  // Fetch project by id
  useEffect(() => {
    dispatch(getProjectById(params.projectId));
    // Clear selected project object on unmount
    return () => {
      dispatch(setSelectedProject(null));
    };
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs selectedItem={projectTitle} />
          <h2>{projectTitle}</h2>
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
        <RenderWhen condition={selectedProject !== null}>
          <RenderWhen
            condition={selectedView === "board"}
            fallback={
              <TasksList 
                tasks={selectedProject?.tasks} 
              />
            }
          >
            <TasksBoard 
              tasks={selectedProject?.tasks}
            />
          </RenderWhen>
        </RenderWhen>
      </div>
    </section>
  );
}
