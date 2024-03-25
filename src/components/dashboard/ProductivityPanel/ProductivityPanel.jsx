import { ProjectsBarChart } from "@/components/projects";
import PropTypes from "prop-types";
import styles from "./ProductivityPanel.module.css";
import { RenderWhen } from "@/components/shared";
export const ProductivityPanel = ({ tasks }) => {
  return (
    <>
      <div className={styles.panel_header}>
        <h2>Productivity</h2>
        <RenderWhen condition={window.innerWidth > 600}>
          <div className={styles.chart_legend}>
            <div className={styles.legend_item}>
              <div
                className={styles.legend_color}
                style={{ backgroundColor: "rgb(133, 114, 238)" }}
              ></div>
              <p>Tasks created</p>
            </div>
            <div className={styles.legend_item}>
              <div
                className={styles.legend_color}
                style={{ backgroundColor: "#2599ef" }}
              ></div>
              <p>Tasks completed</p>
            </div>
          </div>
        </RenderWhen>
      </div>
      {/* <div className={styles.chart_stats}>
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
      </div> */}
      <div className={styles.chart_container}>
        <ProjectsBarChart />
        <RenderWhen condition={window.innerWidth < 600}>
          <div className={styles.chart_legend}>
            <div className={styles.legend_item}>
              <div
                className={styles.legend_color}
                style={{ backgroundColor: "rgb(133, 114, 238)" }}
              ></div>
              <p>Tasks created</p>
            </div>
            <div className={styles.legend_item}>
              <div
                className={styles.legend_color}
                style={{ backgroundColor: "#2599ef" }}
              ></div>
              <p>Tasks completed</p>
            </div>
          </div>
        </RenderWhen>
      </div>
    </>
  );
};

ProductivityPanel.propTypes = {
  tasks: PropTypes.array.isRequired,
};
