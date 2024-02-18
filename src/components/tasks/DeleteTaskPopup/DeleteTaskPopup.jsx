"use client"

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "@/context/AppContext";
import { deleteTask } from "@/redux/features/tasks/tasksSlice";
import { Button } from "@/components/shared";
import styles from "./DeleteTaskPopup.module.css";

export const DeleteTaskPopup = () => {
  const dispatch = useDispatch();
  const { id, title } = useSelector((state) => state.tasks.selectedTask);
  const { handleTaskModal } = useContext(AppContext);

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
    handleTaskModal();
  }

  return (
    <div className={styles.main}>
      <h3>Are you sure you want to delete "{title}"?</h3>
      {/* <p>"{selectedTask.title}"</p> */}
      <div className={styles.btn_container}>
        <Button label="Delete" onClick={handleDeleteTask} />
        <Button label="Cancel" variant="outlined" onClick={handleTaskModal} />
      </div>
    </div>
  );
}
