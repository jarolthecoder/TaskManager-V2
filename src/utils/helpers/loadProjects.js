import { FirebaseDB } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore/lite";

export const loadProjects = async (uid = "") => {
  if (!uid) throw new Error("User uid does not exist");

   const collectionRef = collection(FirebaseDB,`test-user-1/user-projects/projects`);
   const docs = await getDocs(collectionRef); // Firebase docs reference

   const projects = [];

   docs.forEach((doc) => {
     projects.push({ id: doc.id, ...doc.data() }); // doc.data() returns the document data as an object
   });

   console.log({ projects });

   return projects;
}