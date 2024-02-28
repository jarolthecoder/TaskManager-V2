"use client"
import { useContext } from "react";
import { Button, IconButton, MatIcon } from '@/components/shared';
import { AppContext } from '@/context/AppContext';
import { TASK_ACTIONS } from "@/lib/constants";
import PropTypes from 'prop-types';
import styles from "./AddTaskButton.module.css";

const { ADD_TASK } = TASK_ACTIONS;

export const AddTaskButton = ({ buttonType = 'default', size = 'small' }) => {
  const {setSelectedTaskAction, handleTaskModal} = useContext(AppContext);

  const handleAddTask = () => {
    setSelectedTaskAction(ADD_TASK);
    handleTaskModal();
  }

  return (
    <>
      {buttonType === "icon" ? (
        <div className={styles.icon_btn}>
          <IconButton variant="outlined" size={size} onClick={handleAddTask}>
            <MatIcon iconName="add" />
          </IconButton>
          {/* <p>Add Task</p> */}
        </div>
      ) : (
        <Button
          fullWidth
          label="Add Task"
          color="accent"
          size={size}
          startIcon={<MatIcon iconName="add" />}
          onClick={handleAddTask}
        />
      )}
    </>
  );
}

AddTaskButton.propTypes = {
  buttonType: PropTypes.oneOf(['default', 'icon'])
}