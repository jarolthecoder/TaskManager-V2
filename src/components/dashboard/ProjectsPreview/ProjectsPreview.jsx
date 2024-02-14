"use client";

import { Card } from "@/components/shared";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import { projectsData } from "@/api/projectsData";
import styles from "./ProjectsPreview.module.css";

export const ProjectsPreview = () => {
  const [activeView, setActiveView] = useState("Ongoing");
  const [projects, setProjects] = useState(projectsData);

  const ongoingProjects = projectsData.filter(
    (project) => project.progress > 0 && project.progress < 100
  );
  const pendingProjects = projectsData.filter(
    (project) => project.progress === 0
  );

  const handleProjectsView = (selectedView) => {
    selectedView === "Ongoing"
      ? setProjects(ongoingProjects)
      : setProjects(pendingProjects);
    setActiveView(selectedView);
  };

  return (
    <section className={styles.main}>
      <Card>
        <div className={styles.section_header}>
          <h2>Projects</h2>
          <div className={styles.switch}>
            <div
              className={styles.active_layover}
              style={{
                transform:
                  activeView === "Ongoing"
                    ? "translate(0, -50%)"
                    : "translate(100%, -50%)",
              }}
            ></div>
            <p
              className={`${styles.switch_btn} ${
                activeView === "Ongoing" && styles.active
              }`}
              onClick={() => handleProjectsView("Ongoing")}
            >
              Ongoing
            </p>
            <p
              className={`${styles.switch_btn} ${
                activeView === "Pending" && styles.active
              }`}
              onClick={() => handleProjectsView("Pending")}
            >
              Pending
            </p>
          </div>
        </div>
        <div className={styles.section_body}>
          {projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </Card>
    </section>
  );
};
