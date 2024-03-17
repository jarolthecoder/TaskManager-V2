"use client";
import { useSelector } from "react-redux";
import { selectAllProjects } from "@/redux/features/projects";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import styles from "./TasksList.module.css";
import { MatIcon, MenuItem, RenderWhen, Select } from "@/components/shared";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/helpers";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const sortOptions = ["Latest", "Oldest", "Priority High", "Priority Low"];
const formattedToday = formatDate(new Date(), "PP");
const todaysDateFull = formatDate(new Date(), "eeee, MMM d, yyyy");

export const TasksList = () => {
  const projects = useSelector(selectAllProjects);
  const tasks = projects
    .map((project) => project.tasks)
    .flat()
    .sort(
      (taskA, taskB) =>
        new Date(taskB.creationDate) - new Date(taskA.creationDate)
    );

  const [filterValue, setFilterValue] = useState("All Tasks");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sortValue, setSortValue] = useState("Latest");

  const handleFilterChange = (option) => {
    switch (option) {
      case "All Tasks":
        setFilteredTasks(tasks);
        setFilterValue(option);
        break;
      case "Completed":
        const completedTasks = tasks.filter(
          (task) => task.status === "completed"
        );
        setFilteredTasks(completedTasks);
        setFilterValue(option);
        break;
      case "Due Today":
        const inProgressTasks = tasks.filter(
          (task) => task.dueDate === formattedToday
        );
        setFilteredTasks(inProgressTasks);
        setFilterValue(option);
        break;
      case "Pending":
        const pendingTasks = tasks.filter((task) => task.status === "pending");
        setFilteredTasks(pendingTasks);
        setFilterValue(option);
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  const handleSortChange = (option) => {
    switch (option) {
      case "Latest":
        const sortedByLatest = filteredTasks.sort(
          (taskA, taskB) =>
            new Date(taskB.creationDate) - new Date(taskA.creationDate)
        );
        setFilteredTasks(sortedByLatest);
        setSortValue(option);
        break;
      case "Oldest":
        const sortedByOldest = filteredTasks.sort(
          (taskA, taskB) =>
            new Date(taskA.creationDate) - new Date(taskB.creationDate)
        );
        setFilteredTasks(sortedByOldest);
        setSortValue(option);
        break;
      case "Priority High":
        const sortedByPriorityHigh = filteredTasks.sort((taskA, taskB) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return (
            (priorityOrder[taskA.priority] || 0) -
            (priorityOrder[taskB.priority] || 0)
          );
        });
        setFilteredTasks(sortedByPriorityHigh);
        setSortValue(option);
        break;
      case "Priority Low":
        const sortedByPriorityLow = filteredTasks.sort((taskA, taskB) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return (
            (priorityOrder[taskB.priority] || 0) -
            (priorityOrder[taskA.priority] || 0)
          );
        });
        setFilteredTasks(sortedByPriorityLow);
        setSortValue(option);
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [projects]);

  //  useEffect(() => {
  //     setSortValue("Latest");
  //   }, [filterValue]);

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
      {filteredTasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
      </RenderWhen>
    </div>
  );
};
