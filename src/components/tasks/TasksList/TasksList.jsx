"use client";

import { TaskListItem } from "../TaskListItem/TaskListItem";
import { RenderWhen } from "@/components/shared";
import { MatIcon, MenuItem, Select } from "@/components/ui";
import { useMemo, useState } from "react";
import { formatDate } from "@/utils/helpers";
import { SortTaskListButton } from "../SortTaskListButton/SortTaskListButton";
import { TASK_SORT_OPTIONS } from "@/lib/constants";
import PropTypes from "prop-types";
import styles from "./TasksList.module.css";

const filterOptions = [
  "All Tasks",
  "Due Today",
  "Pending",
  "In Progress",
  "Completed",
];
const { LATEST, OLDEST, PRIORITY_HIGH, PRIORITY_LOW } = TASK_SORT_OPTIONS;
const formattedToday = formatDate(new Date(), "PP");

const sortTasks = (tasks, sortValue) => {
  switch (sortValue.value) {
    case OLDEST:
      return [...tasks].sort(
        (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
      );
    case PRIORITY_HIGH:
      return [...tasks].sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (
          (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0)
        );
      });
    case PRIORITY_LOW:
      return [...tasks].sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (
          (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        );
      });

    case LATEST:
    default:
      return [...tasks].sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );
  }
};

export const TasksList = ({ tasks }) => {
  const [filterValue, setFilterValue] = useState("All Tasks");
  const [sortValue, setSortValue] = useState({
    label: "Latest",
    value: LATEST,
  });

  // Filter tasks based on filterValue
  const filteredTasks = useMemo(() => {
    switch (filterValue) {
      case "Completed":
        return tasks.filter((task) => task.status === "completed");
      case "Due Today":
        return tasks.filter((task) => task.dueDate === formattedToday);
      case "Pending":
        return tasks.filter((task) => task.status === "pending");
      case "In Progress":
        return tasks.filter((task) => task.status === "inProgress");
      case "All Tasks":
      default:
        return tasks;
    }
  }, [tasks, filterValue]);

  // Sort filtered tasks based on sortValue
  const sortedTasks = useMemo(
    () => sortTasks(filteredTasks, sortValue),
    [filteredTasks, sortValue]
  );

  const handleFilterChange = (option) => {
    setFilterValue(option);
  };

  const handleSortChange = (option) => {
    setSortValue(option);
  };

  return (
    <div className={styles.main}>
      <div className={styles.list_options_container}>
        <Select
          value={filterValue}
          startIcon={<MatIcon iconName="filter_list" />}
          endIcon="none"
        >
          {filterOptions.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => handleFilterChange(option)}
              selected={option === filterValue}
            >
              <p>{option}</p>
            </MenuItem>
          ))}
        </Select>
        <SortTaskListButton
          onSelect={handleSortChange}
          selectedOption={sortValue}
        />
      </div>
      <RenderWhen
        condition={filteredTasks.length > 0}
        fallback={<p className={styles.list_empty_message}>No tasks to show</p>}
      >
        {sortedTasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </RenderWhen>
    </div>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
};
