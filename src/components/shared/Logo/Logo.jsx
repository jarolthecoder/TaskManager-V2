import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <h1>T</h1>
      </div>
      <p>TaskManager</p>
    </div>
  );
}
