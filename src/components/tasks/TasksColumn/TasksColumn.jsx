"use client";

import { useMemo, useState } from "react";
import { TASK_SORT_OPTIONS } from "@/lib/constants";
import { DroppableTaskList } from "../DroppableTaskList/DroppableTaskList";
import { AddTaskCardButton } from "../AddTaskCardButton/AddTaskCardButton";
import { SortTaskListButton } from "../SortTaskListButton/SortTaskListButton";
import styles from "./TasksColumn.module.css";
import classNames from "classnames";

const { LATEST, OLDEST, PRIORITY_HIGH, PRIORITY_LOW } = TASK_SORT_OPTIONS;

const sortTasks = (tasks, sortValue) => {
  switch (sortValue.value) {
    case OLDEST:
      return [...tasks].sort(
        (taskA, taskB) =>
          new Date(taskA.creationDate) - new Date(taskB.creationDate)
      );
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
    case LATEST:
      return [...tasks].sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );

    default:
      return tasks;
  }
};

export const TasksColumn = ({ listId, listTitle, tasks, colSpan = 4 }) => {
  const numOfTasks = tasks.length;

  const numOfTasksClasses = classNames(
    styles.num_of_tasks,
    listTitle === "To Do" && styles.pending,
    listTitle === "In Progress" && styles.in_progress,
    listTitle === "Completed" && styles.completed,
    listTitle === "Unassigned" && styles.unassigned
  );

  const [sortValue, setSortValue] = useState({
    label: "Latest",
    value: LATEST,
  });

  // Memoize sorted tasks
  const sortedTasks = useMemo(
    () => sortTasks(tasks, sortValue),
    [tasks, sortValue]
  );

  return (
    <div className={styles.main} style={{ gridColumnEnd: `span ${colSpan}` }}>
      <div className={styles.list_header}>
        <div className={styles.list_title}>
          <h3>{listTitle}</h3>
          <span className={numOfTasksClasses}>{numOfTasks}</span>
        </div>
        <SortTaskListButton
          onSelect={setSortValue}
          selectedOption={sortValue}
        />
      </div>
      <div className={styles.list_body}>
        <DroppableTaskList listId={listId} sortedTasks={sortedTasks} />
        <AddTaskCardButton />
      </div>
    </div>
  );
};
