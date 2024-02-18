import styles from "./NotificationPanel.module.css";
import { Button } from "..";

export const NotificationPanel = ({ handleOpen }) => {
    return (
      <div
        className={styles.notifications_panel}
      >
        <div className={styles.panel_header}>
          <h3>Notifications</h3>
          <p>You have 3 unread notifications</p>
        </div>
        <div className={styles.panel_body}>
          <ul className={styles.notifications_list}>
            <li className={styles.notification} onClick={handleOpen}>
              <div className={styles.notification_badge}>
                <span className="material-icons">settings</span>
              </div>
              <div className={styles.notification_content}>
                <span className={styles.notification_title}>Your profile</span>{" "}
                <span className={styles.notification_description}>
                  is 60% completed
                </span>
                <p className={styles.notification_time}>
                  <span class="material-icons">watch_later</span>
                  about 18 hours ago
                </p>
              </div>
            </li>
            <li className={styles.notification} onClick={handleOpen}>
              <div className={`${styles.notification_badge} ${styles.blue}`}>
                <span class="material-icons">textsms</span>
              </div>
              <div className={styles.notification_content}>
                <span className={styles.notification_title}>Cristine Burg</span>{" "}
                <span className={styles.notification_description}>
                  sent you a message
                </span>
                <p className={styles.notification_time}>
                  <span class="material-icons">watch_later</span>
                  about 18 hours ago
                </p>
              </div>
            </li>
            <li className={styles.notification} onClick={handleOpen}>
              <div className={`${styles.notification_badge} ${styles.red}`}>
                <span class="material-icons">warning</span>
              </div>
              <div className={styles.notification_content}>
                <span className={styles.notification_title}>Two tasks</span>{" "}
                <span className={styles.notification_description}>
                  are due tomorrow
                </span>
                <p className={styles.notification_time}>
                  <span class="material-icons">watch_later</span>
                  about 18 hours ago
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.panel_footer}>
          <Button label="View All" fullWidth />
        </div>
      </div>
    );
};
