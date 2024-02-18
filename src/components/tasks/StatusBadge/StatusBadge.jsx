import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./StatusBadge.module.css";

export const StatusBadge = ({ status, className }) => {

  const badgeClasses = classNames(
    className,
    styles.status_badge,
    status === "Pending" && styles.pending,
    status === "In progress" && styles.in_progress,
    status === "Completed" && styles.completed
  )

  console.log({status})

  return (
    <p className={badgeClasses}>{status}</p>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};