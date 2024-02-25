import { projectsData } from "@/api/projectsData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProject: null,
  selectedTask: null,
  projects: [],
  tasks: [],
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

      console.log({ projects: state.projects })
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
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
    },
    deleteFromProjectsList: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    // Tasks actions ======================================================================
    setAllTasks: (state) => {
      state.tasks = state.projects.reduce((acc, project) => {
        return [...acc, ...project.tasks];
      }, []);
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    addTaskToProject: (state, action) => {
      // Adds based on the projectName
      const { projectName } = action.payload;
      const projectIndex = state.projects.findIndex(
        (project) => project.title === projectName
      );
      state.projects[projectIndex].tasks.push(action.payload);
    },
    updateTaskInProject: (state, action) => {
      const { projectName } = action.payload;

      const projectIndex = state.projects.findIndex(
        (project) => project.title === projectName
      );
      const taskIndex = state.projects[projectIndex].tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      state.projects[projectIndex].tasks[taskIndex] = action.payload;
    },
    deleteTaskFromProject: (state, action) => {
      const { id, projectName } = action.payload;
      
      const projectIndex = state.projects.findIndex(
        (project) => project.title === projectName
      );
      state.projects[projectIndex].tasks = state.projects[projectIndex].tasks.filter(
        (task) => task.id !== id
      );
      

    },
  },
});

export const projectsReducer = projectsSlice.reducer;

// Selectors
export const selectAllProjects = (state) => state.projects.projects;
export const selectAllTasks = (state) => {
  return state.projects.projects.reduce((acc, project) => {
    return [...acc, ...project.tasks];
  }, []);
};
export const selectProject = (state) => state.projects.selectedProject;
export const selectTask = (state) => state.projects.selectedTask;

// Actions
export const {
  setSelectedProject,
  addProject,
  updateSelectedProject,
  deleteFromProjectsList,
  setProjects,
  setAllTasks,
  setSelectedTask,
  addTaskToProject,
  updateTaskInProject,
  deleteTaskFromProject,
} = projectsSlice.actions;
