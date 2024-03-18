import styles from "./Menu.module.css";

export const Menu = ({ children }) => {
  return (
    <div className={styles.main}>
      <ul>{children}</ul>
    </div>
  );
};
