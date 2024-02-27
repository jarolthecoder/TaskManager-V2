import styles from "./HeaderSkeleton.module.css";

export const HeaderSkeleton = () => {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.slug}></div>
        <div className={styles.title}></div>
      </div>
      <div className={styles.button}></div>
    </div>
  );
};
