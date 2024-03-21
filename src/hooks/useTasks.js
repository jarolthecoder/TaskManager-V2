"use client"

import { TASK_SORT_OPTIONS } from "@/lib";
import { formatDate } from "@/utils/helpers";
import { useMemo } from "react";

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
export const useTasks = ({tasks, filterValue, sortValue}) => {

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
  }, [tasks, filterValue])

  // Sort filtered tasks based on sortValue
  const sortedTasks = useMemo(
    () => sortTasks(filteredTasks, sortValue),
    [filteredTasks, sortValue]
  );



  return {filteredTasks, sortedTasks}
}
