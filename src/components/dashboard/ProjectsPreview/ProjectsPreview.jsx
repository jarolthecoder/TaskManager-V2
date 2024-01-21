"use client"

import { Card } from "@/components/shared";
import styles from "./ProjectsPreview.module.css";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";

export const ProjectsPreview = () => {

  const [activeButton, setActiveButton] = useState("Ongoing");

  const handleProjectsView = (button) => {
    setActiveButton(button);
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
                  activeButton === "Ongoing"
                    ? "translate(0, -50%)"
                    : "translate(100%, -50%)",
              }}
            ></div>
            <p
              className={`${styles.switch_btn} ${
                activeButton === "Ongoing" && styles.active
              }`}
              onClick={() => handleProjectsView("Ongoing")}
            >
              Ongoing
            </p>
            <p
              className={`${styles.switch_btn} ${
                activeButton === "Pending" && styles.active
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

const projects = [
  {
    id: 1,
    title: "Startup with design",
    description: "Revamp the company website for a better user experience.",
    endDate: "Feb 15 2024",
    tasks: [],
    progress: 78,
  },
  {
    id: 2,
    title: "Website Redesign",
    description: "Revamp the company website for a better user experience.",
    endDate: "Apr 7 2024",
    tasks: [],
    progress: 52,
  },
];
