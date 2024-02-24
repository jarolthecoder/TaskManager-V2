import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./features/tasks/tasksSlice";
import { authReducer } from "./features/auth/authSlice";
import { projectsReducer } from "./features/projects";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    projects: projectsReducer,
  },
})

