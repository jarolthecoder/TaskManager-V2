import { FirebaseDB } from "@/firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { loadProjectById, loadProjects } from "@/utils/helpers";
import {
  addProject,
  deleteFromProjectsList,
  setProjectById,
  setProjects,
  updateSelectedProject,
} from "./projectsSlice";


// Load all projects from the firestore database
export const getProjects = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("User uid does not exist");

    const projects = await loadProjects(uid);

    dispatch(setProjects(projects));
  };
};

// Load project by id from the firestore database
export const getProjectById = (projectId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const project = await loadProjectById(uid, projectId);

    dispatch(setProjectById(project));
  };
};

export const addNewProject = (newProject) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newDoc = doc(
      collection(FirebaseDB, `${uid}/user-projects/projects/`)
    );
    const setDocResp = await setDoc(newDoc, newProject);

    newProject.id = newDoc.id;

    dispatch(addProject(newProject));
  };
};

// Update a task in the firestore database
export const updateProject = (updatedProject) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const projectToFirestore = { ...updatedProject };

    delete projectToFirestore.id;
    
    const docRef = doc(
      FirebaseDB,
      `${uid}/user-projects/projects/${updatedProject.id}`
    );
    await setDoc(docRef, projectToFirestore, { merge: true });

    dispatch(updateSelectedProject(updatedProject));
  };
};


export const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(
      FirebaseDB,
      `${uid}/user-projects/projects/${projectId}`
    );
    await deleteDoc(docRef);

    dispatch(deleteFromProjectsList(projectId));
  };
};
