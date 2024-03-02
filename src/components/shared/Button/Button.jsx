import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.css";

export const Button = ({
  label,
  onClick,
  fullWidth = false,
  variant = "filled",
  align = "left",
  size = "small",
  startIcon,
  endIcon,
  ...restOfProps
}) => {

  const btnClasses = classNames(
    styles.btn,
    size === "small" ? styles.small : styles.medium,
    variant === "outlined" ? styles.outlined : styles.filled,
    classNames
  );

  const containerClasses = classNames(
    styles.container,
    fullWidth && styles.width_full,
    align === "right"
      ? styles.align_right
      : fullWidth || align === "center"
      ? styles.align_center
      : styles.align_left
  );

  return (
    <div className={containerClasses}>
      <button onClick={onClick} className={btnClasses} {...restOfProps}>
        {startIcon}
        {label}
        {endIcon}
      </button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["filled", "outlined"]),
  size: PropTypes.oneOf(["small", "medium"]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};
