import { Button, ProgressBar } from '@/components/shared';
import PropTypes from 'prop-types'
import styles from './ProjectsPreview.module.css'

export const ProjectCard = ({project}) => {
  const { title, endDate, progress } = project;
  return (
    <div className={styles.project_card}>
      <div className={styles.project_header}>
        <h3 className={styles.project_title}>{title}</h3>
        <p className={styles.project_time}>
          <span className="material-icons">watch_later</span>
          Ends {endDate}
        </p>
      </div>
      <div className={styles.project_body}>
        <p className={styles.progress_label}>Completed</p>
        <ProgressBar completed={progress} />
      </div>
      <div className={styles.project_footer}>
        <Button title="View Project" fullWidth />
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
}