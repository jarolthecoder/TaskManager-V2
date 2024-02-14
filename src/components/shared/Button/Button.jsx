import PropTypes from "prop-types";
import styles from "./Button.module.css";
import classNames from "classnames";

export const Button = ({
  title,
  onClick,
  fullWidth,
  align = "left",
  size = "medium",
  ...restOfProps
}) => {
  const btnClasses = classNames(
    styles.btn,
    size === "small" ? styles.small : styles.medium,
    classNames
  );

  const containerClasses = classNames(
    styles.container,
    fullWidth && styles.width_full,
    align === "right"
      ? styles.align_right
      : fullWidth
      ? styles.align_center
      : styles.align_left
  );

  return (
    <div className={containerClasses}>
      <button onClick={onClick} className={btnClasses} {...restOfProps}>
        {title}
      </button>
    </div>
  );
};

Button.defaultProps = {
  fullWidth: false,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
