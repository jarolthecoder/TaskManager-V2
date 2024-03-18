import styles from './ProgressBar.module.css'

export const ProgressBar = ({progress}) => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div
          className={styles.filler}
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      {/* <span className={styles.label}>{`${progress}%`}</span>  */}
    </div>
  );
}
