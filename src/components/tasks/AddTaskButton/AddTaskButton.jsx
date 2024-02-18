"use client"
import { useContext } from "react";
import { Button, IconButton } from '@/components/shared';
import { AppContext } from '@/context/AppContext';
import { TASKS } from "@/lib/constants";
import PropTypes from 'prop-types';
import styles from "./AddTaskButton.module.css";

const { ADD } = TASKS;

export const AddTaskButton = ({ buttonType = 'default' }) => {
  const {setSelectedTaskAction, handleTaskModal} = useContext(AppContext);

  const handleAddTask = () => {
    setSelectedTaskAction(ADD);
    handleTaskModal();
  }

  return (
    <>
      {buttonType === "icon" ? (
        <div className={styles.icon_btn}>
          <IconButton variant="filled" onClick={handleAddTask}>
            <span className="material-icons">add</span>
          </IconButton>
          <p>Add New Task</p>
        </div>
      ) : (
        <Button
          fullWidth
          label="New Task"
          color="accent"
          startIcon={<span className="material-icons">add</span>}
          onClick={handleAddTask}
        />
      )}
    </>
  );
}

AddTaskButton.propTypes = {
  buttonType: PropTypes.oneOf(['default', 'icon'])
}