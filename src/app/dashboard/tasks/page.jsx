"use client";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "@/context/AppContext";
import { TASK_ACTIONS } from "@/lib/constants";
import { formatDate } from "@/utils/helpers/formatDate";
import { Button, RenderWhen } from "@/components/shared";
import { TasksColumn } from "@/components/tasks";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updateTask } from "@/redux/features/tasks/tasksSlice";
import styles from "./tasksPage.module.css";

const { ADD_TASK } = TASK_ACTIONS;
const formattedToday = formatDate(new Date(), "PP");

export default function TasksPage() {
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);
  const tasks = useSelector((state) => state.tasks.tasksList);
  const dispatch= useDispatch();

   const [winReady, setwinReady] = useState(false);
   useEffect(() => {
     setwinReady(true);
   }, []);

  // Filtered tasks for columns
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const unAssignedTasks = tasks.filter((task) => task.assignedTo === "Unassigned");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const dueTodayTasks = tasks.filter((task) => task.dueDate === formattedToday);

  // Task list columns data
  const taskListColumns = [
    { id: "pending", title: "Pending", tasks: pendingTasks },
    { id: "inProgress", title: "In progress", tasks: inProgressTasks },
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
        <h2>Tasks</h2>
        <div className={styles.header_options}>
          <Button
            fullWidth
            label="Add Task"
            color="accent"
            size="small"
            startIcon={<span className="material-icons">add</span>}
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
