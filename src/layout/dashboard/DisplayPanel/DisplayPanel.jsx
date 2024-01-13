import styles from "./DisplayPanel.module.css";

export const DisplayPanel = ({ children }) => {
  return (
    <article className={styles.main}>
      {children}
    </article>
  );
}
