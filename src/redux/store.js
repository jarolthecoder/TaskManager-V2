import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./features/tasks/tasksSlice";
import { authReducer } from "./features/auth/authSlice";
import { projectsReducer } from "./features/projects";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});

