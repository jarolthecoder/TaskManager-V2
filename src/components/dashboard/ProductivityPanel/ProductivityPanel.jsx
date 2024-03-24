import { ProjectsBarChart } from "@/components/projects";
import PropTypes from "prop-types";
import styles from "./ProductivityPanel.module.css";
export const ProductivityPanel = ({tasks}) => {
  return (
    <>
      <div className={styles.panel_header}>
        <h2>Productivity overview</h2>
      </div>
      <div className={styles.chart_stats}>
        <div className={styles.chart_stats_card}>
          <p>{tasks.length}</p>
          <h3>Total tasks</h3>
        </div>
        <div className={styles.chart_stats_card}>
          <p>{tasks.filter((task) => task.status === "completed").length}</p>
          <h3>Tasks completed</h3>
        </div>
        <div className={styles.chart_stats_card}>
          <p>
            {(
              tasks.filter((task) => task.status === "completed").length /
              tasks.length
            ).toFixed(2)}
          </p>
          <h3>Prod. average</h3>
        </div>
        <div className={styles.chart_stats_card}>
          <p className={styles.working_hours_num}>1265,89</p>
          <h3>Working hours</h3>
        </div>
      </div>
      <div className={styles.chart_container}>
        <ProjectsBarChart />
      </div>
    </>
  );
};

ProductivityPanel.propTypes = {
  tasks: PropTypes.array.isRequired,
};