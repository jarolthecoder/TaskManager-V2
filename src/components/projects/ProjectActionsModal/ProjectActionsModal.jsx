"use client";
import { useContext } from "react";
import { Modal } from "@/components/shared";
import { AppContext } from "@/context/AppContext";
import { PROJECT_ACTIONS } from "@/lib/constants";
import { DeleteProjectPopup } from "../DeleteProjectPopup/DeleteProjectPopup";
import { AddProjectForm } from "../AddProjectForm/AddProjectForm";
import { EditProjectForm } from "../EditProjectForm/EditProjectForm";

const { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT } = PROJECT_ACTIONS;

export const ProjectActionsModal = () => {
  const { projectModalOpen, handleProjectModal, selectedProjectAction } =
    useContext(AppContext);

  const shouldShowHeader =
    selectedProjectAction === ADD_PROJECT ||
    selectedProjectAction === EDIT_PROJECT
      ? true
      : false;

  const titleToShow =
    selectedProjectAction === ADD_PROJECT
      ? "Add Project"
      : selectedProjectAction === EDIT_PROJECT
      ? "Edit Project"
      : "";

  return (
    <Modal
      open={projectModalOpen}
      onClose={handleProjectModal}
      showHeader={shouldShowHeader}
      title={titleToShow}
    >
      {selectedProjectAction === ADD_PROJECT && <AddProjectForm />}
      {selectedProjectAction === EDIT_PROJECT && <EditProjectForm />}
      {selectedProjectAction === DELETE_PROJECT && <DeleteProjectPopup />}
    </Modal>
  );
};
