import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./PriorityBadge.module.css";

export const PriorityBadge = ({ priority, className }) => {

  const badgeClasses = classNames(
    className,
    styles.priority_badge,
    priority === "Pending" && styles.high,
    priority === "In progress" && styles.medium,
    priority === "Completed" && styles.low
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