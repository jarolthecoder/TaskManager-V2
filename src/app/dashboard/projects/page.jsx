"use client"

import { useContext } from "react";
import { useSelector } from "react-redux";
import { Button, IconButton, MatIcon } from "@/components/shared";
import { ProjectCard } from "@/components/projects";
import { AppContext } from "@/context/AppContext";
import { PROJECT_ACTIONS } from "@/lib/constants";
import styles from "./projectsPage.module.css";

const { ADD_PROJECT } = PROJECT_ACTIONS;

export default function Projects() {

  const projects = useSelector((state) => state.projects.projects);

  const {handleProjectModal, setSelectedProjectAction} = useContext(AppContext);

   const handleAddProject = () => {
     setSelectedProjectAction(ADD_PROJECT);
     handleProjectModal();
   };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <h2>Projects</h2>
        <div className={styles.header_options}>
          <Button
            fullWidth
            label="Create project"
            color="accent"
            size="small"
            startIcon={<MatIcon iconName="add" />}
            onClick={handleAddProject}
          />
        </div>
      </div>
      <div className={styles.container}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <div className={styles.create_project_card}>
          <IconButton variant="filled" size="small" onClick={handleAddProject}>
            <MatIcon iconName="add" />
          </IconButton>
          <p>Create project</p>
        </div>
      </div>
    </section>
  );
}
