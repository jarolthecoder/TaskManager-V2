import styles from './UserMenu.module.css'

export const UserMenu = () => {
  return (
    <div className={styles.user}>
      <div className={styles.user_img_container}>
        <p className={styles.user_img}>SU</p>
      </div>
      <div>
        <p className={styles.user_name}>
          Super User 
          <span className="material-icons">arrow_drop_down</span>
        </p>
        <p className={styles.user_role}>Admin</p>
      </div>
    </div>
  );
}
