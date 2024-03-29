import { Button, MatIcon } from "@/components/ui";
import styles from "./NotificationPanel.module.css";


export const NotificationPanel = ({ handleOpen }) => {
    return (
      <div className={styles.notifications_panel}>
        <div className={styles.panel_header}>
          <h3>Notifications</h3>
          <p>You have 3 unread notifications</p>
        </div>
        <div className={styles.panel_body}>
          <ul className={styles.notifications_list}>
            <li className={styles.notification} onClick={handleOpen}>
              <div className={styles.notification_badge}>
                <MatIcon iconName="settings" size="small" />
              </div>
              <div className={styles.notification_content}>
                <span className={styles.notification_title}>Your profile</span>{" "}
                <span className={styles.notification_description}>
                  is 60% completed
                </span>
                <p className={styles.notification_time}>
                  <MatIcon iconName="watch_later" size="small" />
                  about 18 hours ago
                </p>
              </div>
            </li>
            <li className={styles.notification} onClick={handleOpen}>
              <div className={`${styles.notification_badge} ${styles.blue}`}>
                <MatIcon iconName="textsms" size="small" />
              </div>
              <div className={styles.notification_content}>
                <span className={styles.notification_title}>Cristine Burg</span>{" "}
                <span className={styles.notification_description}>
                  sent you a message
                </span>
                <p className={styles.notification_time}>
                  <MatIcon iconName="watch_later" size="small" />
                  about 18 hours ago
                </p>
              </div>
            </li>
            <li className={styles.notification} onClick={handleOpen}>
              <div className={`${styles.notification_badge} ${styles.red}`}>
                <MatIcon iconName="warning" size="small" />
              </div>
              <div className={styles.notification_content}>
                <span className={styles.notification_title}>Two tasks</span>{" "}
                <span className={styles.notification_description}>
                  are due tomorrow
                </span>
                <p className={styles.notification_time}>
                  <MatIcon iconName="watch_later" size="small" />
                  about 18 hours ago
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.panel_footer}>
          <Button label="View All" variant="outlined" fullWidth />
        </div>
      </div>
    );
};
