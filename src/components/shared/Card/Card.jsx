import classNames from "classnames";
import styles from "./Card.module.css";

export const Card = ({children, className, color = 'light', ...props}) => {
  const cardClasses = classNames(
    styles.main,
    color === 'dark' ? styles.dark : styles.light,
    className
  )
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}
