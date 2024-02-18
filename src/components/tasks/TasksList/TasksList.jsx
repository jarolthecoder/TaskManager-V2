"use client"
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Button, RenderWhen } from "@/components/shared";
import { AddTaskButton, TaskCard } from "..";
import { TASKS } from "@/lib/constants";
import styles from './TasksList.module.css'

const { ADD } = TASKS;

export const TasksList = ({title, tasks}) => {
  const { setSelectedTaskAction, handleTaskModal } = useContext(AppContext);

  const handleAddTask = () => {
    setSelectedTaskAction(ADD);
    handleTaskModal();
  };

  return (
    <div className={styles.main}>
      <div className={styles.list_header}>
        <h3>{title}</h3>
      </div>
      <div className={styles.list_body}>
        <RenderWhen
          condition={tasks.length > 0}
          fallback={
            <>
              {/* <p>No tasks available</p> */}
              <div className={styles.add_task_btn}>
                <AddTaskButton buttonType="icon" />
              </div>
            </>
          }
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </RenderWhen>
      </div>
      {/* <div className={styles.list_footer}>
        <Button
          fullWidth
          label="Add New Task"
          color="accent"
          size="small"
          startIcon={<span className="material-icons">add</span>}
          onClick={handleAddTask}
        />
      </div> */}
    </div>
  );
}
