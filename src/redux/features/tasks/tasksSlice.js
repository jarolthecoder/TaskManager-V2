import { mockUserData } from "@/api/mockUserData";
import { createSlice } from "@reduxjs/toolkit";

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
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
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
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // setTask: (state, action) => {
    //   state.task = action.payload;
    // },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  setSelectedTask,
  addTask,
  updateSelectedTask,
  deleteFromTasksList,
  setTasks,
} = tasksSlice.actions;
