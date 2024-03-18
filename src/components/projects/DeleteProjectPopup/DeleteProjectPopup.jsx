"use client"

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "@/context/AppContext";
import { deleteProject } from "@/redux/features/projects";
import { Button } from "@/components/ui";
import styles from "./DeleteProjectPopup.module.css";

export const DeleteProjectPopup = () => {
  const dispatch = useDispatch();
  const { id, title } = useSelector((state) => state.projects.selectedProject);
  const { handleProjectModal } = useContext(AppContext);

  const handleDeleteProject = () => {
    dispatch(deleteProject(id));
    handleProjectModal();
  }

  return (
    <div className={styles.main}>
      <h3>Are you sure you want to delete "{title}"?</h3>
      <div className={styles.btn_container}>
        <Button label="Delete" onClick={handleDeleteProject} />
        <Button label="Cancel" variant="outlined" onClick={handleProjectModal} />
      </div>
    </div>
  );
}
