"use client";

import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { AppContext } from "@/context/AppContext";
import { TASK_ACTIONS } from "@/lib/constants";
import { formatDate } from "@/utils/helpers/formatDate";
import { Breadcrumbs, Button, MatIcon, RenderWhen } from "@/components/shared";
import { TasksColumn } from "@/components/tasks";
import { updateTask } from "@/redux/features/tasks";
import styles from "./projectPage.module.css";

const { ADD_TASK } = TASK_ACTIONS;
const formattedToday = formatDate(new Date(), "PP");

export default function ProjectPage() {

  const dispatch = useDispatch();
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const { title, tasks } = selectedProject;

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  // Filtered tasks for columns
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const inReviewTasks = tasks.filter((task) => task.status === "inReview");

  // Task list columns data
  const taskListColumns = [
    { id: "pending", title: "To Do", tasks: pendingTasks },
    { id: "inProgress", title: "Doing", tasks: inProgressTasks },
    { id: "completed", title: "Completed", tasks: completedTasks },
    // {id: "expired", title: "Expired", tasks: tasks.filter((task) => new Date(task.dueDate) < new Date())}
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
    dispatch(updateTask(updatedTask));
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs selectedItem={title}/>
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
