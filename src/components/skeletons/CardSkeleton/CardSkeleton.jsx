import styles from './CardSkeleton.module.css'
export const CardSkeleton = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>
          <div className={styles.date}></div>
          <div className={styles.title}></div>
        </div>
        <div className={styles.button}></div>
      </div>
      <div className={styles.body}></div>
      <div className={styles.footer}></div>
    </div>
  );
}
