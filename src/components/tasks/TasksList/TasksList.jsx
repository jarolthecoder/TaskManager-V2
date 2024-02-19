"use client";

import { IconButton, Menu, MenuItem, Popper } from "@/components/shared";
import { AddTaskButton, TaskCard } from "..";
import styles from "./TasksList.module.css";
import classNames from "classnames";
import { differenceInDays, isToday } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { usePopper } from "@/hooks";

const sortOptions = ["Latest", "Oldest", "Due Date", "Priority High", "Priority Low"];

export const TasksList = ({ title, tasks }) => {
  const numOfTasks = tasks.length;

  const numOfTasksClasses = classNames(
    styles.num_of_tasks,
    title === "Pending" && styles.pending,
    title === "In Progress" && styles.in_progress,
    title === "Completed" && styles.completed,
    title === "Unassigned" && styles.unassigned
  );
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [selectedOption, setSelectedOption] = useState("Latest");

  useEffect(() => {
    const handleSortTasks = () => {
      switch (selectedOption) {
        case "Oldest":
          const sortedByEarliestToLatest = [...tasks].sort((taskA, taskB) => {
            return new Date(taskA.startDate) - new Date(taskB.startDate);
          });
          setSortedTasks(sortedByEarliestToLatest);
          break;

        case "Latest":
          const sortedByLatestToEarliest = [...tasks].sort((taskA, taskB) => {
            return new Date(taskB.startDate) - new Date(taskA.startDate);
          });
          setSortedTasks(sortedByLatestToEarliest);
          break;

        case "Due Date":
          const sortedByDueDate = [...tasks].sort((taskA, taskB) => {
            const isDueTodayA = isToday(new Date(taskA.dueDate));
            const isDueTodayB = isToday(new Date(taskB.dueDate));

            // If one task is due today and the other is not, the task due today should come first
            if (isDueTodayA !== isDueTodayB) {
              return isDueTodayA ? -1 : 1;
            }

            // If both tasks are due today or not due today, sort by the difference in due dates
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
          setSortedTasks(sortedByDueDate);
          break;

        case "Priority High":
          const sortedByPriorityHigh = [...tasks].sort((taskA, taskB) => {
            const priorityOrder = {
              High: 1,
              Medium: 2,
              Low: 3,
            };

            const priorityValueA = priorityOrder[taskA.priority] || 0;
            const priorityValueB = priorityOrder[taskB.priority] || 0;

            return priorityValueA - priorityValueB; // Sort by ascending priority (High > Medium > Low)
          });
          setSortedTasks(sortedByPriorityHigh);
          break;
        case "Priority Low":
          const sortedByPriorityLow = [...tasks].sort((taskA, taskB) => {
            const priorityOrder = {
              High: 1,
              Medium: 2,
              Low: 3,
            };

            const priorityValueA = priorityOrder[taskA.priority] || 0;
            const priorityValueB = priorityOrder[taskB.priority] || 0;

            return priorityValueB - priorityValueA; // Sort by descending priority (Low > Medium > High)
          });
          setSortedTasks(sortedByPriorityLow);
          break;
        default:
          setSortedTasks(tasks);
          break;
      }
    };

    handleSortTasks();
  }, [selectedOption, tasks]);

  return (
    <div className={styles.main}>
      <div className={styles.list_header}>
        <div className={styles.list_title}>
          <h3>{title}</h3>
          <span className={numOfTasksClasses}>{numOfTasks}</span>
        </div>
        <div ref={refEl} className={styles.sort_btn}>
          <small>{selectedOption}</small>
          <IconButton size="small" onClick={togglePopper}>
            <span class="material-icons">swap_vert</span>
          </IconButton>
        </div>
        <Popper open={isPopperOpen} ref={popperRef} onClose={togglePopper}>
          <Menu>
            {sortOptions.map((option) => (
              <MenuItem key={option} onClick={() => setSelectedOption(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Popper>
      </div>
      <div className={styles.list_body}>
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <div className={styles.add_task_btn}>
          <AddTaskButton buttonType="icon" />
        </div>
      </div>
    </div>
  );
};
