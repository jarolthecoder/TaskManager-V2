import { FirebaseDB } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore/lite";

export const loadTasks= async (uid = "", projectId) => {
  if (!uid) throw new Error("User uid does not exist");

  const collectionRef = collection(
    FirebaseDB,
    `test-user-1/user-projects/projects/${projectId}/tasks/`
  );
  const docs = await getDocs(collectionRef); // Firebase docs reference

  const tasks = [];

  docs.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() }); // doc.data() returns the document data as an object
  });

  console.log({ tasks });

  return tasks;
};
