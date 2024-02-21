import { tasksData } from "@/api/tasksData";
import { TASK_SORT_OPTIONS } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import { differenceInDays, isToday } from "date-fns";

const { LATEST, OLDEST, DUE_DATE, PRIORITY_HIGH, PRIORITY_LOW } =
  TASK_SORT_OPTIONS;

const initialState = {
  tasksList: tasksData,
  selectedTask: {
    id: "",
    title: "",
    description: "",
    status: "",
    startDate: "",
    dueDate: "",
    priority: "",
  },
  sortedTasks: tasksData,  
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    addTask: (state, action) => {
      state.tasksList.unshift(action.payload);
    },
    updateTask: (state, action) => {
      const { id } = action.payload;
      const taskIndex = state.tasksList.findIndex((task) => task.id === id);
      state.tasksList[taskIndex] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload
      );
    },
  }
});

export const tasksReducer = tasksSlice.reducer;
export const { setSelectedTask, addTask, updateTask, deleteTask } = tasksSlice.actions;