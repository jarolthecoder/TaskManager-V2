import { RenderWhen } from "@/components/shared";
import PropTypes from "prop-types";
import styles from "./ProgressBar.module.css";

export const ProgressBar = ({
  progress,
  showLabel = false,
  labelAlign = "start",
}) => {
  return (
    <div className={styles.main}>
      <RenderWhen condition={showLabel && labelAlign === "start"}>
        <span className={styles.label}>{progress.toFixed()}%</span>
      </RenderWhen>
      <div className={styles.container}>
        <div
          className={styles.filler}
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <RenderWhen condition={showLabel && labelAlign === "end"}>
        <span className={styles.label}>{progress.toFixed()}%</span>
      </RenderWhen>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  showLabel: PropTypes.bool,
  labelAlign: PropTypes.oneOf(["start", "end"]),
};
