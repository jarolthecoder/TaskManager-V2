import styles from './BoardSkeleton.module.css'

export const BoardSkeleton = () => {
  return (
    <div className={styles.board}>
      <div className={styles.list}>
        <div className={styles.header}></div>
        <div className={styles.body}></div>
        <div className={styles.footer}></div>
      </div>
      <div className={styles.list}>
        <div className={styles.header}></div>
        <div className={styles.body}></div>
        <div className={styles.footer}></div>
      </div>
      <div className={styles.list}>
        <div className={styles.header}></div>
        <div className={styles.body}></div>
        <div className={styles.footer}></div>
      </div>
    </div>
  );
}
