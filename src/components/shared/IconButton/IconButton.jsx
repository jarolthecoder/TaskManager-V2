import classNames from "classnames";
import styles from "./IconsButton.module.css";
import PropTypes from "prop-types";

export const IconButton = ({icon, onClick, variant }) => {

  const btnClassnames = classNames(
    styles.icon_btn,
    variant === "filled" && styles.filled,
  )

  return (
    <button onClick={onClick} className={btnClassnames} type="button">
      <span className="material-icons">{icon}</span>
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};