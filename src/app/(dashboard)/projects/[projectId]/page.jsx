"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProjectById,
  selectProject,
  setSelectedProject,
} from "@/redux/features/projects";
import { Breadcrumbs, RenderWhen } from "@/components/shared";
import { AddTaskButton, TasksBoard } from "@/components/tasks";
import styles from "./projectPage.module.css";

export default function ProjectPage({ params }) {
  const dispatch = useDispatch();

  const selectedProject = useSelector(selectProject);
  const projectTitle = selectedProject?.title;

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
          <AddTaskButton />
        </div>
      </div>
      <div className={styles.container}>
        <RenderWhen condition={selectedProject !== null}>
          <TasksBoard />
        </RenderWhen>
      </div>
    </section>
  );
}