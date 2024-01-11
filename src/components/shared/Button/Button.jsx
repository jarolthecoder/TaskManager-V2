import PropTypes from "prop-types";
import styles from "./Button.module.css";

export const Button = ({ title, onClick, ...restOfProps }) => {
  return (
    <button onClick={onClick} className={styles.btn} {...restOfProps}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
