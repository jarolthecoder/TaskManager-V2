"use client";
import { Modal } from "@/components/shared";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { AddTaskForm, DeleteTaskPopup, EditTaskForm } from "..";
import { TASK_ACTIONS } from "@/lib/constants";

const { ADD_TASK, EDIT_TASK, DELETE_TASK } = TASK_ACTIONS;

export const TaskActionsModal = () => {
  const { taskModalOpen, handleTaskModal, selectedTaskAction } =
    useContext(AppContext);

  const shouldShowHeader =
    selectedTaskAction === ADD_TASK || selectedTaskAction === EDIT_TASK ? true : false;

  const titleToShow =
    selectedTaskAction === ADD_TASK
      ? "Add Task"
      : selectedTaskAction === EDIT_TASK
      ? "Edit Task"
      : "";

  return (
    <Modal
      open={taskModalOpen}
      onClose={handleTaskModal}
      showHeader={shouldShowHeader}
      title={titleToShow}
    >
      {selectedTaskAction === ADD_TASK && <AddTaskForm />}
      {selectedTaskAction === EDIT_TASK && <EditTaskForm />}
      {selectedTaskAction === DELETE_TASK && <DeleteTaskPopup />}
    </Modal>
  );
};
