import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./features/tasks/tasksSlice";
import { authReducer } from "./features/auth/authSlice";
import { projectsReducer } from "./features/projects";
import { appReducer } from "./features/app";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});

