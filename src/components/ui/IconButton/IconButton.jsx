import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./IconButton.module.css";

export const IconButton = ({
  children,
  onClick,
  variant = "standard",
  size = "large",
  color = "default",
  className,
  ...restOfProps
}) => {

  const btnClassnames = classNames(
    className,
    styles.icon_btn,
    variant === "filled" && styles.filled,
    variant === "outlined" && styles.outlined,
    color === "accent" && styles.accent,
     size === "small"
    ? styles.small
    : size === "medium" 
    ? styles.medium
    : styles.large,
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={btnClassnames}
      {...restOfProps}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
};
