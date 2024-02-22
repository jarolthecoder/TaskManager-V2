import { mockUserData } from "@/api/mockUserData";
import { tasksData } from "@/api/tasksData";
import { TASK_SORT_OPTIONS } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import { differenceInDays, isToday } from "date-fns";

const { LATEST, OLDEST, DUE_DATE, PRIORITY_HIGH, PRIORITY_LOW } =
  TASK_SORT_OPTIONS;

const initialState = {
  tasksList: mockUserData.tasks,
  selectedTask: {
    id: "",
    title: "",
    description: "",
    status: "",
    startDate: "",
    dueDate: "",
    priority: "",
  },
  tasks: [],
  task: {},
  isTaskSaved: false,
  isSavingTask: false,
  message: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    updateSelectedTask: (state, action) => {
      const { id } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      state.tasks[taskIndex] = action.payload;
    },
    deleteFromTasksList: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  setSelectedTask,
  addTask,
  updateSelectedTask,
  deleteFromTasksList,
  setTask,
  setTasks,
} = tasksSlice.actions;
