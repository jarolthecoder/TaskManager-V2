import styles from './ProgressBar.module.css'

export const ProgressBar = ({completed}) => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div
          className={styles.filler}
          style={{
            width: `${completed}%`,
          }}
        ></div>
      </div>
      <span className={styles.label}>{`${completed}%`}</span> 
    </div>
  );
}
