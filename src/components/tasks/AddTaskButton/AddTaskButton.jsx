"use client"
import { useContext } from "react";
import { Button, IconButton } from '@/components/shared';
import { AppContext } from '@/context/AppContext';
import { TASK_ACTIONS } from "@/lib/constants";
import PropTypes from 'prop-types';
import styles from "./AddTaskButton.module.css";

const { ADD_TASK } = TASK_ACTIONS;

export const AddTaskButton = ({ buttonType = 'default' }) => {
  const {setSelectedTaskAction, handleTaskModal} = useContext(AppContext);

  const handleAddTask = () => {
    setSelectedTaskAction(ADD_TASK);
    handleTaskModal();
  }

  return (
    <>
      {buttonType === "icon" ? (
        <div className={styles.icon_btn}>
          <IconButton variant="filled" size="small" onClick={handleAddTask}>
            <span className="material-icons">add</span>
          </IconButton>
          {/* <p>Add Task</p> */}
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