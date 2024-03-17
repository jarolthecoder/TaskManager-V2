"use client";
import { useSelector } from "react-redux";
import { selectAllProjects } from "@/redux/features/projects";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import { MatIcon, MenuItem, RenderWhen, Select } from "@/components/shared";
import { useMemo, useState } from "react";
import { formatDate } from "@/utils/helpers";
import styles from "./TasksList.module.css";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const sortOptions = ["Latest", "Oldest", "Priority High", "Priority Low"];
const formattedToday = formatDate(new Date(), "PP");

export const TasksList = () => {
  const projects = useSelector(selectAllProjects);
  const allTasks = projects.flatMap((project) => project.tasks);

  const [filterValue, setFilterValue] = useState("All Tasks");
  const [sortValue, setSortValue] = useState("Latest");

  // Filter tasks based on filterValue
  const filteredTasks = useMemo(() => {
    switch (filterValue) {
      case "Completed":
        return allTasks.filter((task) => task.status === "completed");
      case "Due Today":
        return allTasks.filter((task) => task.dueDate === formattedToday);
      case "Pending":
        return allTasks.filter((task) => task.status === "pending");
      case "All Tasks":
      default:
        return allTasks;
    }
  }, [allTasks, filterValue]);

  // Sort filtered tasks based on sortValue
  const sortedTasks = useMemo(() => {
    switch (sortValue) {
      case "Oldest":
        return [...filteredTasks].sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
      case "Priority High":
        return [...filteredTasks].sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
        });
      case "Priority Low":
        return [...filteredTasks].sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        });
      case "Latest":
      default:
        return [...filteredTasks].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    }
  }, [filteredTasks, sortValue]);

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
            <MenuItem key={index} onClick={() => handleFilterChange(option)}>
              <p>{option}</p>
            </MenuItem>
          ))}
        </Select>
        <Select
          value={sortValue}
          startIcon={<MatIcon iconName="swap_vert" />}
          endIcon="none"
        >
          {sortOptions.map((option, index) => (
            <MenuItem key={index} onClick={() => handleSortChange(option)}>
              <p>{option}</p>
            </MenuItem>
          ))}
        </Select>
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
