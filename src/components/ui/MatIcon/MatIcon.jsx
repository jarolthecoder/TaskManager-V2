import PropTypes from "prop-types";
import classNames from "classnames";

export const MatIcon = ({ iconName, size = "regular", className, style }) => {
  
  const iconClasses = classNames("material-icons", className);

  return (
    <span
      className={iconClasses}
      style={{
        ...style,
        fontSize: size === "small" ? "18px" : size === "large" ? "27px" : "24px",
      }}
    >
      {iconName}
    </span>
  );
};

MatIcon.propTypes = {
  iconName: PropTypes.string,
  size: PropTypes.oneOf(["small", "regular", "large"]),
  className: PropTypes.string,
};
