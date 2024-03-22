"use client";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "@/hooks";
import { Breadcrumbs, GoBackButton, RenderWhen } from "@/components/shared";
import { MatIcon } from "@/components/ui";
import { AddTaskButton, TasksBoard, TasksList } from "@/components/tasks";
import { useSelector } from "react-redux";
import { selectAllProjects, updateProject } from "@/redux/features/projects";
import { useDispatch } from "react-redux";
import styles from "./tasksPage.module.css";

export default function TasksPage() {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  // Derive tasks directly from projects
  const tasks = useMemo(
    () => projects.flatMap((project) => project.tasks),
    [projects]
  );
  const preferedTaskView = localStorage.getItem("prefered-task-view");

  const { winWidth } = useWindowSize();

  const [allTasks, setAllTasks] = useState(tasks);
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
    const projectToUpdate = projects.find(
      (project) => project.title === task.projectName
    );

    const updatedProject = {
      ...projectToUpdate,
      tasks: projectToUpdate.tasks.map((task) =>
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

  // Update tasks state whenever projects change
  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <GoBackButton />
          <Breadcrumbs />
          <h2>My Tasks</h2>
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
        <RenderWhen
          condition={selectedView === "board" && winWidth > 600}
          fallback={<TasksList tasks={allTasks} />}
        >
          <TasksBoard onDragEnd={handleDragEnd} tasks={allTasks} />
        </RenderWhen>
      </div>
    </section>
  );
}
