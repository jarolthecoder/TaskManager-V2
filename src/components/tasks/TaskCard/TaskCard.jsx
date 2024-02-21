"use client";

import { useContext, useRef } from "react";
import { AppContext } from "@/context/AppContext";
import { usePopper } from "@/hooks";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "@/redux/features/tasks/tasksSlice";
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Popper,
} from "@/components/shared";
import { formatDate } from "@/utils/helpers/formatDate";
import { TASK_ACTIONS } from "@/lib/constants";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TaskCard.module.css";

const { EDIT_TASK, DELETE_TASK } = TASK_ACTIONS;
const formattedToday = formatDate(new Date(), "PP");

export const TaskCard = ({ task }) => {
  const taskClasses = classNames(
    styles.task_card,
    task.status === "completed" && styles.completed
  );

  const { title, description, priority, assignedTo, dueDate } = task;
  const isDueToday = task.dueDate === formattedToday;

  const dispatch = useDispatch();
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { handleTaskModal, setSelectedTaskAction } = useContext(AppContext);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const handleSelectEdit = () => {
    dispatch(setSelectedTask(task));
    handleTaskModal();
    setSelectedTaskAction(EDIT_TASK);
    togglePopper();
  };

  const handleSelectDelete = () => {
    dispatch(setSelectedTask(task));
    handleTaskModal();
    setSelectedTaskAction(DELETE_TASK);
    togglePopper();
  };

  return (
    <Card className={taskClasses}>
      <div className={styles.task_header}>
        <div className={styles.task_title}>
          <h4>{title}</h4>
        </div>
        <div ref={refEl}>
          <IconButton
            size="small"
            className={styles.task_options_btn}
            onClick={togglePopper}
          >
            <span className="material-icons">more_horiz</span>
          </IconButton>
        </div>
        <Popper ref={popperRef} open={isPopperOpen}>
          <Menu>
            <MenuItem icon="edit" onClick={handleSelectEdit}>
              <p>Edit</p>
            </MenuItem>
            <MenuItem icon="delete" onClick={handleSelectDelete}>
              <p>Delete</p>
            </MenuItem>
          </Menu>
        </Popper>
      </div>
      <div className={styles.task_body}>
        <p className={styles.task_description}>{description}</p>
        <div className={styles.project_badge_container}>
          <span
            className={styles.project_badge}
            style={{
              background: task.assignedTo === "Unassigned" && "#333C46",
              color: task.assignedTo === "Unassigned" && "#a0a8b1",
              // opacity: task.assignedTo === "Unassigned" && "0.3",
            }}
          >
            {assignedTo}
          </span>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.task_footer}>
        <div className={styles.task_stat_row}>
          <p className={styles.task_stat}>
            <span className={`material-icons ${styles.stat_icon}`}>
              schedule
            </span>
            {isDueToday ? "Today" : dueDate}
          </p>
          <p
            style={{
              color:
                task.priority === "High"
                  ? "#E57373"
                  : task.priority === "Medium"
                  ? "#FFCC80"
                  : "#56e3c2",
            }}
          >
            {priority}
          </p>
        </div>
      </div>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};