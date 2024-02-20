"use client"
import { createContext, useState } from 'react';
import { TASK_ACTIONS } from "@/lib/constants";

const { ADD_TASK } = TASK_ACTIONS

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // Task Modal State
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTaskAction, setSelectedTaskAction] = useState(ADD_TASK);

  const handleTaskModal = () => {
    setTaskModalOpen((prev) => !prev);
  }

  const value = {
    taskModalOpen,
    selectedTaskAction,
    setSelectedTaskAction,
    handleTaskModal,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}