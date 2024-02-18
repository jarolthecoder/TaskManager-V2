"use client";

import { Button, MenuItem, RenderWhen, Select } from "@/components/shared";
import { AddTaskButton, TaskCard, TasksList } from "@/components/tasks";
import { useContext, useEffect, useState } from "react";
import { formatDate } from "@/utils/helpers/formatDate";
import { useSelector } from "react-redux";
import styles from "./tasksPage.module.css";
import { AppContext } from "@/context/AppContext";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const formattedToday = formatDate(new Date(), "PP");

export default function TasksPage() {
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);
  const { tasksList } = useSelector((state) => state.tasks);

  const [filterValue, setFilterValue] = useState("All Tasks");
  const [filteredTasks, setFilteredTasks] = useState(tasksList);
  const [view, setView] = useState("Grid");
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completed"
  );
  const dueTodayTasks = filteredTasks.filter(
    (task) => task.dueDate === formattedToday
  );
  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "Pending"
  );
  const unAssignedTasks = filteredTasks.filter(
    (task) => task.projectAssigned === ""
  );

  const inProgressTasks = filteredTasks.filter( 
    (task) => task.status === "In progress"
  );

  const handleAddTask = () => {
    setSelectedTaskAction(ADD);
    handleTaskModal();
  };
  const handleFilterChange = (option) => {
    setFilterValue(option);
    switch (option) {
      case "All Tasks":
        setFilteredTasks(tasksList);
        break;
      case "Completed":
        setFilteredTasks(completedTasks);
        break;
      case "Due Today":
        setFilteredTasks(dueTodayTasks);
        break;
      case "Pending":
        setFilteredTasks(pendingTasks);
        break;
      default:
        setFilteredTasks(tasksList);
        break;
    }
  };

  const handleViewChange = () => {
    setView((prev) => (prev === "List" ? "Grid" : "List"));
  };

  useEffect(() => {
    setFilteredTasks(tasksList);
  }, [tasksList]);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <h2>Tasks</h2>
        <div className={styles.header_options}>
          <Button
            fullWidth
            label="Add New Task"
            color="accent"
            size="small"
            startIcon={<span className="material-icons">add</span>}
            onClick={handleAddTask}
          />
          {/* <Select value={filterValue}>
            {filterOptions.map((option, index) => (
              <MenuItem key={index} onClick={() => handleFilterChange(option)}>
                <p>{option}</p>
              </MenuItem>
            ))}
          </Select>
          <div className={styles.view_select}>
            <p
              className={styles.view_select_btn}
              onClick={() => setView("List")}
            >
              <span class="material-icons">format_list_bulleted</span>
            </p>
            <p
              className={styles.view_select_btn}
              onClick={() => setView("Grid")}
            >
              <span class="material-icons">apps</span>
            </p> */}

          {/* <p className={styles.view_select_btn} onClick={handleViewChange}>
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
            </p> */}
          {/* </div> */}
        </div>
      </div>
      <div
        className={`${styles.container} ${
          view === "List" ? styles.list_view : styles.grid_view
        }`}
      >
        {/* {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            selectedView={view}
            today={formattedToday}
          />
        ))} */}
        {/* <div className={styles.add_task_btn}>
          <AddTaskButton buttonType="icon" />
        </div> */}

        <TasksList title="To Do" tasks={pendingTasks} />
        <TasksList title="In Progress" tasks={inProgressTasks} />
        <TasksList title="Completed" tasks={completedTasks} />
        <TasksList title="Unassigned" tasks={unAssignedTasks} />
      </div>
    </section>
  );
}
