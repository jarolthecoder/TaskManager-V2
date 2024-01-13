import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./PriorityBadge.module.css";

export const PriorityBadge = ({ priority }) => {

  const badgeClasses = classNames(
    styles.priority_badge,
    priority === "high" && styles.high,
    priority === "medium" && styles.medium,
    priority === "low" && styles.low
  )

  return (
    <p className={badgeClasses}>{priority}</p>
  );
}

PriorityBadge.defaultProps = {
  priority: "low",
};

PriorityBadge.propTypes = {
  priority: PropTypes.string.isRequired,
};