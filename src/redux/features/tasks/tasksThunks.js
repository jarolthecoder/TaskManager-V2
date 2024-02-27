import { FirebaseDB } from "@/firebase/config";
import {
  addTask,
  deleteFromTasksList,
  setTasks,
  updateSelectedTask,
} from "./tasksSlice";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore/lite";
import { loadTasks } from "@/utils/helpers";

// Load all tasks from the firestore database
export const getTasks = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { projectId } = getState().projects;
    
    if (!uid) throw new Error("User uid does not exist");

    const tasks = await loadTasks(uid);

    dispatch(setTasks(tasks));

    // For projects
    // const projects = await loadTasks(uid);

    // dispatch(setTasks(projects));
  };
};

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

// Add a new task to the firestore database
export const addNewTask = (newTask) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newDoc = doc(collection(FirebaseDB, `${uid}/project/tasks/`));
    const setDocResp = await setDoc(newDoc, newTask);

    newTask.id = newDoc.id;

    dispatch(addTask(newTask));
  };
};

// Update a task in the firestore database
export const updateTask = (updatedTask) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const taskToFirestore = { ...updatedTask };

    delete taskToFirestore.id;
    console.log({ taskToFirestore });
    const docRef = doc(FirebaseDB, `${uid}/project/tasks/${updatedTask.id}`);
    await setDoc(docRef, taskToFirestore, { merge: true });

    dispatch(updateSelectedTask(updatedTask));
  };
};

// Delete a task from the firestore database
export const deleteTask = (taskId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `${uid}/project/tasks/${taskId}`);
    await deleteDoc(docRef);

    dispatch(deleteFromTasksList(taskId));
  };
};
