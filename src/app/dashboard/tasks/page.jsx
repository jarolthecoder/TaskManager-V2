"use client";

import { tasksData } from "@/api/tasksData";
import { Menu, MenuItem, RenderWhen } from "@/components/shared";
import { TaskItem } from "@/components/tasks/TaskItem/TaskItem";
import { AddTaskButton } from "@/components/dashboard";
import { useMenu } from "@/hooks/useMenu";
import { useRef, useState } from "react";
import { formatDate } from "@/utils/helpers/formatDate";
import styles from "./tasksPage.module.css";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const formattedToday = formatDate(new Date(), "PP");

export default function TasksPage() {
  
  const refEl = useRef();
  const { isMenuOpen, position, handleMenu } = useMenu(refEl);
  const [filterValue, setFilterValue] = useState("All Tasks");
  const [filteredTasks, setFilteredTasks] = useState(tasksData);
  const [view, setView] = useState("Grid");

  const handleFilterChange = (option) => {
    setFilterValue(option);
    switch (option) {
      case "All Tasks":
        setFilteredTasks(tasksData);
        break;
      case "Completed":
        const completedTasks = tasksData.filter(
          (task) => task.status === "Completed"
        );
        setFilteredTasks(completedTasks);
        break;
      case "Due Today":
        const inProgressTasks = tasksData.filter(
          (task) => task.dueDate === formattedToday
        );
        setFilteredTasks(inProgressTasks);
        break;
      case "Pending":
        const pendingTasks = tasksData.filter(
          (task) => task.status === "Pending"
        );
        setFilteredTasks(pendingTasks);
        break;
      default:
        setFilteredTasks(tasksData);
        break;
    }
    handleMenu();
  };

  const handleViewChange = () => {
    setView((prev) => (prev === "List" ? "Grid" : "List"));
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <h2>Tasks</h2>
        <div className={styles.header_options}>
          <div className={styles.select}>
            <p className={styles.select_btn} ref={refEl} onClick={handleMenu}>
              <span className="material-icons">filter_list</span>
              {filterValue}
              <span className="material-icons">arrow_drop_down</span>
            </p>
            <Menu open={isMenuOpen} position={position}>
              {filterOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleFilterChange(option)}
                >
                  <p>{option}</p>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className={styles.select}>
            <p className={styles.select_btn} onClick={handleViewChange}>
              <RenderWhen
                condition={view === "List"}
                fallback={
                  <>
                    <span className="material-icons">view_module</span>
                    Grid
                  </>
                }
              >
                <span className="material-icons">view_headline</span>
                List
              </RenderWhen>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${styles.container} ${
          view === "List" ? styles.list_view : styles.grid_view
        }`}
      >
        {filteredTasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            selectedView={view} 
            today={formattedToday}
          />
        ))}
        <div className={styles.add_task_btn}>
          <AddTaskButton />
        </div>
      </div>
    </section>
  );
}
