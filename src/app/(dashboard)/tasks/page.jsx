"use client"
import { useEffect, useState } from "react";
import { Breadcrumbs, MatIcon, RenderWhen } from "@/components/shared";
import { AddTaskButton, TasksBoard, TasksList  } from "@/components/tasks";
import { useSelector } from "react-redux";
import { selectAllProjects, updateProject } from "@/redux/features/projects";
import { useDispatch } from "react-redux";
import styles from "./tasksPage.module.css";

export default function TasksPage() {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const tasks = projects.flatMap((project) => project.tasks);
  const preferedTaskView = localStorage.getItem("prefered-task-view");

  const [allTasks, setAllTasks] = useState(tasks) 
  const [selectedView, setSelectedView] = useState(preferedTaskView || "board");

  const handleSelectedView = (view) => {
    setSelectedView(view);
    localStorage.setItem("prefered-task-view", view);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { destination } = result;
    const destinationColumn = destination.droppableId;
    const taskId = result.draggableId;
    const task = allTasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, status: destinationColumn };
    const projectToUpdate = projects.find((project) => project.title === task.projectName);

    const updatedProject = {
      ...projectToUpdate,
      tasks: projectToUpdate.tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      ),
    };

    try {
      dispatch(updateProject(updatedProject));
    } catch (error) {
      console.log("Error updating project", error.message)
    }
    
    setAllTasks(
      allTasks.map((task) =>
        task.id === taskId ? updatedTask : task
      )
    );
  };

  useEffect(() => {
    setAllTasks(tasks);
  }, [projects]);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs />
          <h2>Tasks</h2>
        </div>
        <div className={styles.header_options}>
          <p
            className={`${styles.view_btn} ${
              selectedView === "board" ? styles.active : ""
            }`}
            onClick={() => handleSelectedView("board")}
          >
            <MatIcon iconName="calendar_view_week" />
            Board
          </p>
          <p
            className={`${styles.view_btn} ${
              selectedView === "list" ? styles.active : ""
            }`}
            onClick={() => handleSelectedView("list")}
          >
            <MatIcon iconName="format_list_bulleted" />
            List
          </p>
          <AddTaskButton />
        </div>
      </div>
      <div className={styles.container}>
        <RenderWhen
          condition={selectedView === "board"}
          fallback={<TasksList tasks={allTasks}/>}
        >
          <TasksBoard 
            onDragEnd={handleDragEnd}
            tasks={allTasks}
          />
        </RenderWhen>
      </div>
    </section>
  );
}
