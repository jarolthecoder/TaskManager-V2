"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { differenceInDays, isToday } from "date-fns";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { usePopper } from "@/hooks";
import { TASK_SORT_OPTIONS } from "@/lib/constants";
import { IconButton, Menu, MenuItem, Popper } from "@/components/shared";
import { AddTaskButton, TaskCard } from "..";
import styles from "./TasksList.module.css";
import classNames from "classnames";


const { LATEST, OLDEST, DUE_DATE, PRIORITY_HIGH, PRIORITY_LOW } =
  TASK_SORT_OPTIONS;

const sortOptions = [
  { label: "Latest", value: LATEST },
  { label: "Oldest", value: OLDEST },
  { label: "Due Date", value: DUE_DATE },   { label: "Priority High", value: PRIORITY_HIGH },
  { label: "Priority Low", value: PRIORITY_LOW },
 ]

const sortTasksReducer = (state, action) => {
  const { type, tasks } = action;

  switch (type) {
    case LATEST:
      return [...tasks].sort(
        (taskA, taskB) => new Date(taskB.startDate) - new Date(taskA.startDate)
      );
    case OLDEST:
      return [...tasks].sort(
        (taskA, taskB) => new Date(taskA.startDate) - new Date(taskB.startDate)
      );
    case DUE_DATE:
      return [...tasks].sort((taskA, taskB) => {
        const isDueTodayA = isToday(new Date(taskA.dueDate));
        const isDueTodayB = isToday(new Date(taskB.dueDate));

        if (isDueTodayA !== isDueTodayB) {
          return isDueTodayA ? -1 : 1;
        }

        const differenceA = differenceInDays(
          new Date(taskA.dueDate),
          new Date()
        );
        const differenceB = differenceInDays(
          new Date(taskB.dueDate),
          new Date()
        );
        return differenceA - differenceB;
      });
    case PRIORITY_HIGH:
      return [...tasks].sort((taskA, taskB) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (
          (priorityOrder[taskA.priority] || 0) -
          (priorityOrder[taskB.priority] || 0)
        );
      });
    case PRIORITY_LOW:
      return [...tasks].sort((taskA, taskB) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (
          (priorityOrder[taskB.priority] || 0) -
          (priorityOrder[taskA.priority] || 0)
        );
      });
    default:
      return state;
  }
};

export const TasksList = ({ title, tasks }) => {
  const numOfTasks = tasks.length;

  const numOfTasksClasses = classNames(
    styles.num_of_tasks,
    title === "Pending" && styles.pending,
    title === "In progress" && styles.in_progress,
    title === "Completed" && styles.completed,
    title === "Unassigned" && styles.unassigned
  );

  // Popper states
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  // Sorting reducer & state
  const [sortedTasks, dispatch] = useReducer(sortTasksReducer, tasks);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  // Update sorted tasks when the selected option changes
  useEffect(() => {
    dispatch({ type: selectedOption.value, tasks, selectedOption });
  }, [selectedOption, tasks]);

  return (
    <div className={styles.main}>
      <div className={styles.list_header}>
        <div className={styles.list_title}>
          <h3>{title}</h3>
          <span className={numOfTasksClasses}>{numOfTasks}</span>
        </div>
        <div ref={refEl} className={styles.sort_btn}>
          <small>{selectedOption.label}</small>
          <IconButton size="small" onClick={togglePopper}>
            <span class="material-icons">swap_vert</span>
          </IconButton>
        </div>
        <Popper open={isPopperOpen} ref={popperRef} onClose={togglePopper}>
          <Menu>
            {sortOptions.map((option) => (
              <MenuItem key={option} onClick={() => setSelectedOption(option)}>
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Popper>
      </div>
      <div className={styles.list_body}>
        <Droppable droppableId={title}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.tasks_container}
            >
              {sortedTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className={styles.add_task_btn} style={{
          marginTop: tasks.length === 0 ? "0" : "1rem"
        }}>
          <AddTaskButton buttonType="icon" />
        </div>
      </div>
    </div>
  );
};
