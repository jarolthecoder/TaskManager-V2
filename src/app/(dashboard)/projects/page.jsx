"use client";

import { useContext } from "react";
import { useSelector } from "react-redux";
import { selectAllProjects } from "@/redux/features/projects";
import { Breadcrumbs, GoBackButton, RenderWhen } from "@/components/shared";
import { Button, IconButton, MatIcon } from "@/components/ui";
import { ProjectCard } from "@/components/projects";
import { AppContext } from "@/context/AppContext";
import { PROJECT_ACTIONS } from "@/lib/constants";
import styles from "./projectsPage.module.css";

const { ADD_PROJECT } = PROJECT_ACTIONS;

export default function Projects() {
  const projects = useSelector(selectAllProjects);

  const projectsWithAssignedTasks = projects.filter(
    (project) => project.title !== "Unassigned"
  );

  const { handleProjectModal, setSelectedProjectAction } =
    useContext(AppContext);

  const handleAddProject = () => {
    setSelectedProjectAction(ADD_PROJECT);
    handleProjectModal();
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <GoBackButton />
          <Breadcrumbs />
          <h2>Projects</h2>
        </div>
        <div className={styles.header_options}>
          <RenderWhen condition={window.innerWidth > 600}>
            <Button
              fullWidth
              label="Create project"
              color="accent"
              size="small"
              startIcon={<MatIcon iconName="add" />}
              onClick={handleAddProject}
            />
          </RenderWhen>
        </div>
      </div>
      <div className={styles.container}>
        {projectsWithAssignedTasks.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <div className={styles.create_project_card}>
          <IconButton
            variant="outlined"
            size="small"
            onClick={handleAddProject}
          >
            <MatIcon iconName="add" />
          </IconButton>
          <p>Create project</p>
        </div>
      </div>
    </section>
  );
}
