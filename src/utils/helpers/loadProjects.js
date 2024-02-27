import { FirebaseDB } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore/lite";

export const loadProjects = async (uid = "") => {
  if (!uid) throw new Error("User uid does not exist");

   const collectionRef = collection(FirebaseDB,`${uid}/user-projects/projects`);
   const docs = await getDocs(collectionRef); // Firebase docs reference

   const projects = [];

   docs.forEach((doc) => {
     projects.push({ id: doc.id, ...doc.data() }); // doc.data() returns the document data as an object
   });

   console.log({ projects });

   return projects;
}

export const loadProjectById = async (uid = "", id = "") => {
  if (!uid) throw new Error("User uid does not exist");

  const collectionRef = collection(
    FirebaseDB,
    `${uid}/user-projects/projects/`
  );
  const docs = await getDocs(collectionRef);

  let project = {};

  docs.forEach((doc) => {
    if (doc.id === id) {
      project = { id: doc.id, ...doc.data() };
    }
  });

  return project;
};
