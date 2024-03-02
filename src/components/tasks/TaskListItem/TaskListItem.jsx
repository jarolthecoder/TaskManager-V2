"use client";

import { useContext, useRef } from "react";
import { AppContext } from "@/context/AppContext";
import { usePopper } from "@/hooks";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "@/redux/features/projects";
import {
  Badge,
  Card,
  IconButton,
  MatIcon,
  Menu,
  MenuItem,
  Popper,
} from "@/components/shared";
import { formatDate } from "@/utils/helpers/formatDate";
import { TASK_ACTIONS } from "@/lib/constants";
import PropTypes from "prop-types";
import styles from "./TaskListItem.module.css";

const { EDIT_TASK, DELETE_TASK } = TASK_ACTIONS;
const formattedToday = formatDate(new Date(), "PP");

export const TaskListItem = ({ task }) => {
  const dispatch = useDispatch();
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { handleTaskModal, setSelectedTaskAction } = useContext(AppContext);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const { title, description, priority, status, projectName, dueDate } = task;
  const isDueToday = dueDate === formattedToday;
  const dueDateShort = formatDate(new Date(task.dueDate), "LLL d");

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
    <div className={styles.task_list_tem}>
      <Card key={task.id}>
        <div className={styles.task_header}>
          <Badge
            color={projectName === "Unassigned" ? "disabled" : "primary"}
            variant="pill"
          >
            {projectName}
          </Badge>

          <div ref={refEl}>
            <IconButton
              size="small"
              className={styles.task_options_btn}
              onClick={togglePopper}
            >
              <MatIcon iconName="more_horiz" />
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
          <h3>{title}</h3>
          <p className={styles.task_description}>{description}</p>
        </div>
        <div className={styles.task_footer}>
          <p className={styles.task_stat}>
            <MatIcon iconName="event" size="small" />
            Due {isDueToday ? "Today" : dueDateShort}
          </p>
          <div className={styles.task_badges_container}>
            <Badge
              color={
                priority === "High"
                  ? "error"
                  : priority === "Medium"
                  ? "warning"
                  : "success"
              }
              variant="pill"
            >
              {priority}
            </Badge>
            <Badge
              color={
                status === "completed"
                  ? "completed"
                  : task.status === "pending"
                  ? "pending"
                  : task.status === "inProgress"
                  ? "in-progress"
                  : "primary"
              }
              variant="pill"
            >
              {status}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
};
