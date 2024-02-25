"use client";

import { useEffect, useReducer, useState } from "react";
import { differenceInDays, isToday } from "date-fns";
import { TASK_SORT_OPTIONS } from "@/lib/constants";
import { DroppableTaskList } from "../DroppableTaskList/DroppableTaskList";
import { AddTaskCardButton } from "../AddTaskCardButton/AddTaskCardButton";
import { SortTaskListButton } from "../SortTaskListButton/SortTaskListButton";
import styles from "./TasksColumn.module.css";
import classNames from "classnames";

const { LATEST, OLDEST, DUE_DATE, PRIORITY_HIGH, PRIORITY_LOW } =
  TASK_SORT_OPTIONS;

const initialSortValue = {
  label: "Latest",
  value: LATEST,
};

const sortTasksReducer = (state, action) => {
  const { type, tasks } = action;

  switch (type) {
    case LATEST:
      return [...tasks].sort(
        (taskA, taskB) => new Date(taskB.creationDate) - new Date(taskA.creationDate)
      );
    case OLDEST:
      return [...tasks].sort(
        (taskA, taskB) => new Date(taskA.creationDate) - new Date(taskB.creationDate)
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

export const TasksColumn = ({ listId, listTitle, tasks, colSpan = 4 }) => {
  const numOfTasks = tasks.length;

  const numOfTasksClasses = classNames(
    styles.num_of_tasks,
    listTitle === "To Do" && styles.pending,
    listTitle === "Doing" && styles.in_progress,
    listTitle === "Completed" && styles.completed,
    listTitle === "Unassigned" && styles.unassigned
  );

  // Sorting reducer & state
  const [sortedTasks, dispatch] = useReducer(sortTasksReducer, tasks);
  const [selectedOption, setSelectedOption] = useState(initialSortValue);

  // Update sorted tasks when the selected option changes or a new task is added
  useEffect(() => {
    dispatch({ type: selectedOption.value, tasks, selectedOption });
  }, [selectedOption, tasks]);

  return (
    <div className={styles.main} style={{
      gridColumnEnd: `span ${colSpan}`
    }}>
      <div className={styles.list_header}>
        <div className={styles.list_title}>
          <h3>{listTitle}</h3>
          <span className={numOfTasksClasses}>{numOfTasks}</span>
        </div>
        <SortTaskListButton
          onSelect={setSelectedOption}
          selectedOption={selectedOption}
        />
      </div>
      <div className={styles.list_body}>
        <DroppableTaskList listId={listId} sortedTasks={sortedTasks} />
        <AddTaskCardButton tasksLength={numOfTasks} />
      </div>
    </div>
  );
};
