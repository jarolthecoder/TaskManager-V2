import PropTypes from "prop-types";
import styles from "./Button.module.css";
import classNames from "classnames";

export const Button = ({ title, onClick, fullWidth, ...restOfProps }) => {
  
  const btnClasses = classNames(
    styles.btn,
    fullWidth && styles.width_full,
    classNames
  )
  
  return (
    <button onClick={onClick} className={btnClasses} {...restOfProps}>
      {title}
    </button>
  );
};

Button.defaultProps = {
  fullWidth: false
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
