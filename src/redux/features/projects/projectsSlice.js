import { projectsData } from "@/api/projectsData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProject: null,
  selectedTask: null,
  projects: [],
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
    setProjectById: (state, action) => {
      state.selectedProject = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      ); 
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },
    updateSelectedProject: (state, action) => {
      const { id } = action.payload;
      const projectIndex = state.projects.findIndex(
        (project) => project.id === id
      );
      state.projects[projectIndex] = action.payload;

      // Update selectedProject if it's the same project
      if(state.selectedProject && state.selectedProject.id === id) {
        state.selectedProject = action.payload;
      }
    },
    deleteFromProjectsList: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    // Tasks actions ======================================================================
    setAllTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
});

export const projectsReducer = projectsSlice.reducer;

// Selectors
export const selectAllProjects = (state) => state.projects.projects;
export const selectProject = (state) => state.projects.selectedProject;
export const selectTask = (state) => state.projects.selectedTask;

// Actions
export const {
  setSelectedProject,
  addProject,
  updateSelectedProject,
  deleteFromProjectsList,
  setProjects,
  setProjectById,
  setAllTasks,
  setSelectedTask,
} = projectsSlice.actions;
