import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Badge.module.css";

export const Badge = ({ children, variant, color = "primary", className, style, ...props }) => {
  const badgeClasses = classNames(
    className,
    styles.badge,
    color === "primary" && styles.primary,
    color === "pending" && styles.pending,
    color === "in-progress" && styles.in_progress,
    color === "completed" && styles.completed,
    color === "warning" && styles.warning,
    color === "danger" && styles.danger,
    color === "success" && styles.success,
    color === "error" && styles.error,
    color === "disabled" && styles.disabled,
    variant === "pill" && styles.pill,
    variant === "outlined" && styles.outlined
  );

  return (
    <p className={badgeClasses} {...props} style={style}>{children}</p>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};
