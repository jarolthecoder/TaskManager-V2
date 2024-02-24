"use client";

import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTasks, updateTaskInProject } from "@/redux/features/projects";
import { AppContext } from "@/context/AppContext";
import { TASK_ACTIONS } from "@/lib/constants";
import { Breadcrumbs, Button, MatIcon, RenderWhen } from "@/components/shared";
import { TasksColumn } from "@/components/tasks";
import styles from "./tasksPage.module.css";

const { ADD_TASK } = TASK_ACTIONS;

export default function TasksPage() {

  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);

  // State for displaying the drag and drop columns after the window is ready
  const [winReady, setwinReady] = useState(false);

  // Filtered tasks for columns
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const unAssignedTasks = tasks.filter((task) => task.projectName === "Unassigned");

  // Task list columns data
  const taskListColumns = [
    { id: "pending", title: "To Do", tasks: pendingTasks },
    { id: "inProgress", title: "Doing", tasks: inProgressTasks },
    { id: "completed", title: "Completed", tasks: completedTasks },
    // { id: "unAssigned", title: "Unassigned", tasks: unAssignedTasks },
  ];

  const handleAddTask = () => {
    setSelectedTaskAction(ADD_TASK);
    handleTaskModal();
  };

  // Update task status on drag end (drop)
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
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs />
          <h2>Tasks</h2>
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
        <RenderWhen condition={winReady}>
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
