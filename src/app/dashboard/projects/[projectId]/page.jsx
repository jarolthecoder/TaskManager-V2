"use client";

import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { AppContext } from "@/context/AppContext";
import {
  selectProject,
  setSelectedProject,
  updateTaskInProject,
} from "@/redux/features/projects";
import { TASK_ACTIONS } from "@/lib/constants";
import { Breadcrumbs, Button, MatIcon, RenderWhen } from "@/components/shared";
import { TasksColumn } from "@/components/tasks";
import styles from "./projectPage.module.css";

const { ADD_TASK } = TASK_ACTIONS;

export default function ProjectPage() {
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);
  const dispatch = useDispatch();
  const selectedProject = useSelector(selectProject);

  // State for displaying the drag and drop columns after the window is ready
  const [winReady, setwinReady] = useState(false);

  // Filtered tasks for columns
  const { title, tasks } = selectedProject;
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // Task list columns data
  const taskListColumns = [
    { id: "pending", title: "To Do", tasks: pendingTasks },
    { id: "inProgress", title: "Doing", tasks: inProgressTasks },
    { id: "completed", title: "Completed", tasks: completedTasks },
  ];

  const handleAddTask = () => {
    setSelectedTaskAction(ADD_TASK);
    handleTaskModal();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { destination } = result;
    const destinationColumn = destination.droppableId;
    const taskId = result.draggableId;
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, status: destinationColumn };
    dispatch(updateTaskInProject(updatedTask));
  };

  useEffect(() => {
    setwinReady(true);
    // Clear selected project object on unmount
    return () => {
      dispatch(setSelectedProject(null));
    };
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs selectedItem={title} />
          <h2>{title}</h2>
        </div>
        <div className={styles.header_options}>
          <Button
            fullWidth
            label="Add Task"
            color="accent"
            size="small"
            startIcon={<MatIcon iconName="add" />}
            onClick={handleAddTask}
          />
        </div>
      </div>
      <div className={styles.container}>
        <RenderWhen condition={winReady && selectedProject !== null}>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {taskListColumns.map((column) => (
              <TasksColumn
                key={column.id}
                listId={column.id}
                listTitle={column.title}
                tasks={column.tasks}
              />
            ))}
          </DragDropContext>
        </RenderWhen>
      </div>
    </section>
  );
}
