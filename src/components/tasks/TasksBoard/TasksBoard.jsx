"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, usePathname } from "next/navigation";
import { DragDropContext } from "react-beautiful-dnd";
import {
  selectAllProjects,
  selectProject,
  updateProject,
} from "@/redux/features/projects";
import { RenderWhen } from "@/components/shared";
import { TasksColumn } from "..";
import styles from "./TasksBoard.module.css";

export const TasksBoard = () => {
  const pathname = usePathname();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const selectedProject = useSelector(selectProject);
  const allTasks = projects.map((project) => project.tasks).flat();

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (pathname.includes(projectId)) {
      setTaskList(selectedProject.tasks);
    } else {
      setTaskList(allTasks);
    }
  }, [projects, selectedProject, projectId, pathname]);

  // State for displaying the drag and drop columns after the window is ready
  const [winReady, setwinReady] = useState(false);

  // Filtered tasks for columns
  const pendingTasks = taskList.filter((task) => task.status === "pending");
  const inProgressTasks = taskList.filter(
    (task) => task.status === "inProgress"
  );
  const completedTasks = taskList.filter((task) => task.status === "completed");

  // Task list columns data
  const taskListColumns = [
    { id: "pending", title: "To Do", tasks: pendingTasks },
    { id: "inProgress", title: "Doing", tasks: inProgressTasks },
    { id: "completed", title: "Completed", tasks: completedTasks },
  ];

  // Update task status on drag end (drop)
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { destination } = result;
    const destinationColumn = destination.droppableId;
    const taskId = result.draggableId;
    const task = taskList.find((task) => task.id === taskId);
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

    dispatch(updateProject(updatedProject));
  };

  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <RenderWhen condition={winReady}>
      <div className={styles.main}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {taskListColumns.map((column) => (
            <TasksColumn
              key={column.id}
              listId={column.id}
              listTitle={column.title}
              tasks={column.tasks}
              colSpan={4}
            />
          ))}
        </DragDropContext>
      </div>
    </RenderWhen>
  );
};
