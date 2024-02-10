import classNames from "classnames";
import styles from "./Card.module.css";

export const Card = ({children, className, ...props}) => {
  const cardClasses = classNames(
    styles.main,
    className
  )
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}
