import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Badge.module.css";

export const Badge = ({ children, variant, color, className }) => {
  const badgeClasses = classNames(
    className,
    styles.badge,
    color === "pending" && styles.pending,
    color === "in-progress" && styles.in_progress,
    color === "completed" && styles.completed,
    color === "warning" && styles.warning,
    color === "danger" && styles.danger,
    color === "success" && styles.success,
    color === "error" && styles.error,
    color === "primary" && styles.primary,
    variant === "pill" && styles.pill
  );

  return (
    <p className={badgeClasses}>{children}</p>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};
