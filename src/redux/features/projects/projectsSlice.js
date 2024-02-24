import { projectsData } from "@/api/projectsData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProject: {},
  projects: projectsData,
  isprojectsaved: false,
  isSavingProject: false,
  message: "",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
      console.log("selected project", state.selectedProject);
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },
    updateSelectedProject: (state, action) => {
      const { id } = action.payload;
      const projectIndex = state.projects.findIndex((project) => project.id === id);
      state.projects[projectIndex] = action.payload;
    },
    deleteFromProjectsList: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
    // Tasks actions ======================================================================
    addTaskToProject: (state, action) => {
      const { id } = state.selectedProject;
      const projectIndex = state.projects.findIndex((project) => project.id === id);
      state.projects[projectIndex].tasks.push(action.payload);
    },
    updateTaskInProject: (state, action) => {
      const { id, taskId } = action.payload;
      const projectIndex = state.projects.findIndex((project) => project.id === id);
      const taskIndex = state.projects[projectIndex].tasks.findIndex(
        (task) => task.id === taskId
      );
      state.projects[projectIndex].tasks[taskIndex] = action.payload;
    },
    deleteTaskFromProject: (state, action) => {
      const { id, taskId } = action.payload;
      const projectIndex = state.projects.findIndex((project) => project.id === id);
      state.projects[projectIndex].tasks = state.projects[projectIndex].tasks.filter(
        (task) => task.id !== taskId
      );
    },
  },
});

export const projectsReducer = projectsSlice.reducer;
export const {
  setSelectedProject,
  addProject,
  updateSelectedProject,
  deleteFromProjectsList,
  setProjects,
  addTaskToProject,
  updateTaskInProject,
  deleteTaskFromProject,
} = projectsSlice.actions;
