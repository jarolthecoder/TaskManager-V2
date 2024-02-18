"use client";
import { Modal } from "@/components/shared";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { TASKS } from "@/lib/constants";
import { AddTaskForm, DeleteTaskPopup, EditTaskForm } from "..";

const { ADD, EDIT, DELETE } = TASKS;

export const TaskActionsModal = () => {
  const { taskModalOpen, handleTaskModal, selectedTaskAction } =
    useContext(AppContext);

  const shouldShowHeader =
    selectedTaskAction === ADD || selectedTaskAction === EDIT ? true : false;

  const titleToShow =
    selectedTaskAction === ADD
      ? "Add Task"
      : selectedTaskAction === EDIT
      ? "Edit Task"
      : "";

  return (
    <Modal
      open={taskModalOpen}
      onClose={handleTaskModal}
      showHeader={shouldShowHeader}
      title={titleToShow}
    >
      {selectedTaskAction === ADD && <AddTaskForm />}
      {selectedTaskAction === EDIT && <EditTaskForm />}
      {selectedTaskAction === DELETE && <DeleteTaskPopup />}
    </Modal>
  );
};
