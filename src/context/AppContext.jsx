"use client"
import { createContext, useState } from 'react';
import { TASK_ACTIONS, PROJECT_ACTIONS } from "@/lib/constants";

const { ADD_TASK } = TASK_ACTIONS
const { ADD_PROJECT } = PROJECT_ACTIONS

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  }

  // Task Modal State
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTaskAction, setSelectedTaskAction] = useState(ADD_TASK);

  const handleTaskModal = () => {
    setTaskModalOpen((prev) => !prev);
  }

  // Project Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProjectAction, setSelectedProjectAction] = useState(ADD_PROJECT);

  const handleProjectModal = () => {
    setProjectModalOpen((prev) => !prev);
  }

  const value = {
    sidebarOpen,
    handleSidebar,
    taskModalOpen,
    selectedTaskAction,
    setSelectedTaskAction,
    handleTaskModal,
    projectModalOpen,
    selectedProjectAction,
    setSelectedProjectAction,
    handleProjectModal,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}