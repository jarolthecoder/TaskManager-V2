import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./StatusBadge.module.css";

export const StatusBadge = ({ status, variant, className }) => {

  const badgeClasses = classNames(
    className,
    styles.status_badge,
    status === "pending" && styles.pending,
    status === "inProgress" && styles.in_progress,
    status === "completed" && styles.completed,
    variant === "pill" && styles.pill
  );

  return (
    <p className={badgeClasses}>{status}</p>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};