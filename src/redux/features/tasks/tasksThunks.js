import { FirebaseDB } from "@/firebase/config";
import { addTask, setTask, setTasks } from "./tasksSlice";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { loadTasks } from "@/utils/helpers";

// Load all tasks from the database
export const getTasks = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("User uid does not exist");

    const tasks = await loadTasks(uid);

    console.log({tasks})

    dispatch(setTasks(tasks));
  };
};

// Load task by id from the database
export const getTaskById = (taskId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("User uid does not exist");

    const collectionRef = collection(FirebaseDB, `${uid}/projects/tasks`);
    const docRef = doc(collectionRef, taskId);
    const task = await getDoc(docRef);
    // console.log({id: task.id, ...task.data()}) // Improve id handling - add directly to the task object in fireStore

    dispatch(setTask({ id: task.id, ...task.data() }));
  };
};

// Add a new task to the database
export const addNewTask = (newTask) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newDoc = doc(collection(FirebaseDB, `${uid}/projects/tasks/`));
    const setDocResp = await setDoc(newDoc, newTask);

    newTask.id = newDoc.id;

    dispatch(addTask(newTask));
  };
};

export const updateTask = () => {
  return async (dispatch, getState) => {
    const { task } = getState().tasks;

    const taskToFirestore = {...task}

    delete taskToFirestore.id;
    console.log({taskToFirestore})


    // dispatch(setTask(updatedTask));
  };
}