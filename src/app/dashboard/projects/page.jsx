import { Button, IconButton } from "@/components/shared";
import styles from "./projectsPage.module.css";
import { projectsData } from "@/api/projectsData";
import { ProjectCard } from "@/components/projects";

export default function Projects() {
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
            startIcon={<span className="material-icons">add</span>}
          />
        </div>
      </div>
      <div className={styles.container}>
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <div className={styles.create_project_card}>
          <IconButton variant="filled" size="small">
            <span className="material-icons">add</span>
          </IconButton>
          <p>Create project</p>
        </div>
      </div>
    </section>
  );
}
