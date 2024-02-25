import { FirebaseDB } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { loadProjects } from "@/utils/helpers";
import { addProject, deleteFromProjectsList, setProjects, updateSelectedProject } from "./projectsSlice";

// Load all projects from the firestore database
export const getProjects = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("User uid does not exist");

    const projects = await loadProjects(uid);

    dispatch(setProjects(projects));
  };
};

export const addNewProject = (newProject) => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;

    const newDoc = doc(
      collection(FirebaseDB, `${uid}/user-projects/projects/`)
    );
    const setDocResp = await setDoc(newDoc, newProject);

    newProject.id = newDoc.id;

    dispatch(addProject(newProject));
  }
}

// Update a task in the firestore database
export const updateProject = (updatedProject) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const projectToFirestore = { ...updatedProject };

    delete projectToFirestore.id;
    console.log({ projectToFirestore });
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

    const docRef = doc(FirebaseDB, `${uid}/user-projects/projects/${projectId}`);
    await deleteDoc(docRef);

    dispatch(deleteFromProjectsList(projectId));
  }
}

// TO REVIEW!!! =========================================================================

// export const addTask = (newTask) => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;

//     const newDoc = doc(
//       collection(FirebaseDB, `${uid}/user-projects/projects/${newTask.projectId}`)
//     );
//     const setDocResp = await setDoc(newDoc, newTask);

//     newTask.id = newDoc.id;

//     dispatch(addTaskToProject(newTask));
//   }
// }


/** NOTE: Not using at the moment, it will probably be used later for user projects */
// Load task by id from the firestore database
// export const getTaskById = (taskId) => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;
//     if (!uid) throw new Error("User uid does not exist");

//     const collectionRef = collection(FirebaseDB, `${uid}/project/tasks`);
//     const docRef = doc(collectionRef, taskId);
//     const task = await getDoc(docRef);

//     dispatch(setTask({ id: task.id, ...task.data() }));
//   };
// };

// // Add a new task to the firestore database
// export const addNewTask = (newTask) => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;

//     const newDoc = doc(collection(FirebaseDB, `${uid}/project/tasks/`));
//     const setDocResp = await setDoc(newDoc, newTask);

//     newTask.id = newDoc.id;

//     dispatch(addTask(newTask));
//   };
// };

// // Update a task in the firestore database
// export const updateTask = (updatedTask) => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;

//     const taskToFirestore = { ...updatedTask };

//     delete taskToFirestore.id;
//     console.log({ taskToFirestore });
//     const docRef = doc(FirebaseDB, `${uid}/project/tasks/${updatedTask.id}`);
//     await setDoc(docRef, taskToFirestore, { merge: true });

//     dispatch(updateSelectedTask(updatedTask));
//   };
// };

// // Delete a task from the firestore database
// export const deleteTask = (taskId) => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;

//     const docRef = doc(FirebaseDB, `${uid}/project/tasks/${taskId}`);
//     await deleteDoc(docRef);

//     dispatch(deleteFromTasksList(taskId));
//   };
// };
