"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProjectById,
  selectProject,
  setSelectedProject,
  updateProject,
} from "@/redux/features/projects";
import { Breadcrumbs, RenderWhen } from "@/components/shared";
import { MatIcon } from "@/components/ui";
import { AddTaskButton, TasksBoard, TasksList } from "@/components/tasks";
import styles from "./projectPage.module.css";
import { useWindowSize } from "@/hooks";

export default function ProjectPage({ params }) {
  const dispatch = useDispatch();
  const selectedProject = useSelector(selectProject);
  const projectTitle = selectedProject?.title;
  const preferedTaskView = localStorage.getItem("prefered-task-view");
  const { winWidth } = useWindowSize();

  // Local state
  const [selectedView, setSelectedView] = useState(preferedTaskView || "board");
  const [allTasks, setAllTasks] = useState(selectedProject?.tasks);

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

    const updatedProject = {
      ...selectedProject,
      tasks: selectedProject.tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      ),
    };

    try {
      dispatch(updateProject(updatedProject));
    } catch (error) {
      console.log("Error updating project", error.message);
    }

    setAllTasks(
      allTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  // Fetch project by id
  useEffect(() => {
    dispatch(getProjectById(params.projectId));
    // Clear selected project object on unmount
    return () => {
      dispatch(setSelectedProject(null));
    };
  }, []);

  useEffect(() => {
    setAllTasks(selectedProject?.tasks);
  }, [selectedProject]);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <RenderWhen condition={winWidth > 600}>
            <Breadcrumbs selectedItem={projectTitle} />
          </RenderWhen>
          <h2>{projectTitle}</h2>
        </div>
        <div className={styles.header_options}>
          <RenderWhen condition={winWidth > 600}>
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
          </RenderWhen>
        </div>
      </div>
      <div className={styles.container}>
        <RenderWhen condition={selectedProject !== null}>
          <RenderWhen
            condition={selectedView === "board" && winWidth > 600}
            fallback={<TasksList tasks={selectedProject?.tasks} />}
          >
            <TasksBoard tasks={allTasks} onDragEnd={handleDragEnd} />
          </RenderWhen>
        </RenderWhen>
      </div>
    </section>
  );
}
