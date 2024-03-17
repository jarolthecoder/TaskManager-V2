"use client";

import { useMemo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useWindowReady } from "@/hooks";
import { RenderWhen } from "@/components/shared";
import { TasksColumn } from "..";
import PropTypes from "prop-types";
import styles from "./TasksBoard.module.css";

export const TasksBoard = ({ tasks, onDragEnd }) => {
  const {windowReady} = useWindowReady();

  const taskListColumns = useMemo(() => {
    const pendingTasks = tasks?.filter((task) => task.status === "pending");
    const inProgressTasks = tasks?.filter((task) => task.status === "inProgress");
    const completedTasks = tasks?.filter((task) => task.status === "completed");

    return [
      { id: "pending", title: "To Do", tasks: pendingTasks },
      { id: "inProgress", title: "Doing", tasks: inProgressTasks },
      { id: "completed", title: "Completed", tasks: completedTasks },
    ];
  }, [tasks]);

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