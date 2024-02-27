"use client"

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProjects, selectTask, updateProject } from "@/redux/features/projects";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/shared";
import styles from "./DeleteTaskPopup.module.css";

export const DeleteTaskPopup = () => {

  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const selectedTask = useSelector(selectTask);
  const { handleTaskModal } = useContext(AppContext);
  const { title } = selectedTask;
  
  const handleDeleteTask = () => {

    const selectedProject = projects.find((project) => project.title === selectedTask.projectName)

    const updatedProject = {
      ...selectedProject,
      tasks: selectedProject.tasks.filter((task) => task.id !== selectedTask.id),
    };

    dispatch(updateProject(updatedProject));
    handleTaskModal();
  }

  return (
    <div className={styles.main}>
      <h3>Are you sure you want to delete "{title}"?</h3>
      <div className={styles.btn_container}>
        <Button label="Delete" onClick={handleDeleteTask} />
        <Button label="Cancel" variant="outlined" onClick={handleTaskModal} />
      </div>
    </div>
  );
}
