"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import {
  selectAllProjects,
  updateProject,
} from "@/redux/features/projects";
import { RenderWhen } from "@/components/shared";
import { TasksColumn } from "..";
import PropTypes from "prop-types";
import styles from "./TasksBoard.module.css";
import { useWindowReady } from "@/hooks";


export const TasksBoard = ({ tasks }) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);

  const {windowReady} = useWindowReady();

  const taskListColumns = useMemo(() => {
    const pendingTasks = tasks.filter((task) => task.status === "pending");
    const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
    const completedTasks = tasks.filter((task) => task.status === "completed");

    return [
      { id: "pending", title: "To Do", tasks: pendingTasks },
      { id: "inProgress", title: "Doing", tasks: inProgressTasks },
      { id: "completed", title: "Completed", tasks: completedTasks },
    ];
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { destination } = result;
    const destinationColumn = destination.droppableId;
    const taskId = result.draggableId;
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, status: destinationColumn };
    const projectToUpdate = projects.find((project) => project.title === task.projectName);

    const updatedProject = {
      ...projectToUpdate,
      tasks: projectToUpdate.tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      ),
    };

    dispatch(updateProject(updatedProject));
  };

  return (
    <RenderWhen condition={windowReady}>
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

TasksBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
};