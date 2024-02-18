"use client"

import { IconButton, Menu, MenuItem, Popper } from "@/components/shared";
import { AddTaskButton, TaskCard } from "..";
import styles from './TasksList.module.css';
import classNames from "classnames";
import { differenceInDays, set } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { usePopper } from "@/hooks";

const sortOptions = ["Due Today", "Priority High", "Priority Low"];

export const TasksList = ({title, tasks}) => {

  const numOfTasks = tasks.length;

  const numOfTasksClasses = classNames(
    styles.num_of_tasks,
    title === "Pending" && styles.pending,
    title === "In Progress" && styles.in_progress,
    title === "Completed" && styles.completed,
    title === "Unassigned" && styles.unassigned
  )
   const refEl = useRef(null);
   const popperRef = useRef(null);
   const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

const [sortedTasks, setSortedTasks] = useState(tasks);

const handleSortTasks = (option) => {
  switch (option) {
    case "All Tasks":
      setSortedTasks(tasks);
      break;
    case "Due Today":
      const sortedByDate = [...tasks].sort((taskA, taskB) => {
        const differenceA = differenceInDays(
          new Date(taskA.dueDate),
          new Date()
        );
        const differenceB = differenceInDays(
          new Date(taskB.dueDate),
          new Date()
        );
        return differenceA - differenceB; // Sort by ascending difference
      });

      setSortedTasks(sortedByDate);
      break;
    case "Priority high":
      const sortedByPriorityHigh = [...tasks].sort((taskA, taskB) => {
        const priorityOrder = {
          High: 3,
          Medium: 2,
          Low: 1,
        };

        const priorityValueA = priorityOrder[taskA.priority] || 0; 
        const priorityValueB = priorityOrder[taskB.priority] || 0;
        
        return priorityValueB - priorityValueA; // Sort by ascending priority (High > Medium > Low)
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
   togglePopper();
};

  return (
    <div className={styles.main}>
      <div className={styles.list_header}>
        <div className={styles.list_title}>
          <h3>{title}</h3>
          <span className={numOfTasksClasses}>{numOfTasks}</span>
        </div>
        <div ref={refEl} className={styles.sort_btn}>
          <IconButton size="small" onClick={togglePopper}>
            <span class="material-icons">swap_vert</span>
          </IconButton>
        </div>
        <Popper open={isPopperOpen} ref={popperRef}>
          <Menu>
            {sortOptions.map((option) => (
              <MenuItem key={option} onClick={() => handleSortTasks(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Popper>
        {/* <Select value={filterValue}>
          {filterOptions.map((option, index) => (
            <MenuItem key={index} onClick={() => handleFilterChange(option)}>
              <p>{option}</p>
            </MenuItem>
          ))}
        </Select> */}
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
}