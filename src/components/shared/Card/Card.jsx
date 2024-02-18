import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Card.module.css";

export const Card = ({children, className, color = 'default', ...restOfProps}) => {
  const cardClasses = classNames(
    styles.main,
    color === 'default' &&  styles.default,
    color === 'light' && styles.light,
    color === 'dark' && styles.dark,
    className
  )
  
  return (
    <div className={cardClasses} {...restOfProps}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'light', 'dark'])
}