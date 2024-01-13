import { Button, Card } from "@/components/shared"
import styles from "./ProjectsPreview.module.css"

export const ProjectsPreview = () => {
  return (
    <section className={styles.main}>
      <Card>
        <div className={styles.section_header}>
          <h2>Projects</h2>
          <div className={styles.switch_btn}>
            <p>Ongoing</p>
            <p>Pending</p>
          </div>
        </div>
        <div className={styles.section_body}>
          <Card className={styles.project_card}>
            <div className={styles.project_header}>
              <h3>Startup with design</h3>
            </div>
            <div className={styles.project_body}>
              <p>Tasks 3</p>
              <p>Progress bar</p>
            </div>
            <Button title="View Project" />
          </Card>
          <Card className={styles.project_card}>
            <div className={styles.project_header}>
              <h3>Product and app design</h3>
            </div>
            <div className={styles.project_body}>
              <p>Tasks 3</p>
              <p>Progress bar</p>
            </div>
            <Button title="View Project" />
          </Card>
        </div>
      </Card>
    </section>
  );
}
