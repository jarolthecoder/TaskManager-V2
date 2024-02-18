"use client"
import { createContext, useState } from 'react';
import { TASKS } from "@/lib/constants";

const { ADD } = TASKS

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // Task Modal State
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTaskAction, setSelectedTaskAction] = useState(ADD);

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