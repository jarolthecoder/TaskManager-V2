"use client";

import { useContext, useRef } from "react";
import { AppContext } from "@/context/AppContext";
import { usePopper } from "@/hooks";
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Popper,
  PriorityBadge,
} from "@/components/shared";
import classNames from "classnames";
import styles from "./TaskCard.module.css";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "@/redux/features/tasks/tasksSlice";
import { TASKS } from "@/lib/constants";

const { EDIT, DELETE} = TASKS;

export const TaskCard = ({ task, selectedView, today }) => {
   const taskClasses = classNames(
     styles.task_card,
     selectedView === "List" && styles.list_item,
     task.status === "Completed" && styles.completed
   );

  const { id, title, description, status } = task;
  const isDueToday = task.dueDate === today;

  const dispatch = useDispatch();
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { handleTaskModal, setSelectedTaskAction } = useContext(AppContext);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const handleSelectEdit = () => {
    dispatch(setSelectedTask(task))
    handleTaskModal();
    setSelectedTaskAction(EDIT);
    togglePopper();
  }

  const handleSelectDelete = () => {
    dispatch(setSelectedTask(task))
    handleTaskModal();
    setSelectedTaskAction(DELETE);
    togglePopper()
  }

  return (
    <Card key={id} className={taskClasses}>
      <div className={styles.task_header}>
        <div className={styles.project_badge}>
          <p>Web Design</p>
        </div>
        <div ref={refEl}>
          <IconButton
            size="small"
            className={styles.options_btn}
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
        <div className={styles.task_title}>
          <h4>{title}</h4>
        </div>
        <p className={styles.task_description}>{description}</p>
        {/* Maybe */}
        {/* <textarea
          placeholder="Add a description..."
          rows="3"
          className={styles.task_description}
        >
          {description}
        </textarea> */}
      </div>
      <hr className={styles.divider} />
      <div className={styles.task_footer}>
        <div className={styles.task_stat_row}>
          <p>Priority</p>
          <p
            style={{
              color:
                task.priority === "High"
                  ? "#E17F41"
                  : task.priority === "Medium"
                  ? "#f4c47c"
                  : "#15CAB0",
            }}
          >
            {task.priority}
          </p>
        </div>
        <div className={styles.task_stat_row}>
          <p>Status</p>
          <PriorityBadge priority={status} className={styles.item_priority} />
        </div>
        <div className={styles.task_stat_row}>
          <p>Due Date</p>
          <p>{isDueToday ? "Today" : task.dueDate}</p>
        </div>
      </div>
    </Card>
  );
};