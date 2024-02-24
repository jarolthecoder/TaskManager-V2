"use client"

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskFromProject, selectTask } from "@/redux/features/projects";
import { AppContext } from "@/context/AppContext";
import { deleteTask } from "@/redux/features/tasks";
import { Button } from "@/components/shared";
import styles from "./DeleteTaskPopup.module.css";

export const DeleteTaskPopup = () => {

  const dispatch = useDispatch();
  const selectedTask = useSelector(selectTask);
  const { handleTaskModal } = useContext(AppContext);
  const { title } = selectedTask;
  
  const handleDeleteTask = () => {
    dispatch(deleteTaskFromProject(selectedTask));
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
