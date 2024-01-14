import styles from './UserBar.module.css'
import { LanguageMenu } from '../LanguageMenu/LanguageMenu';
import { UserMenu } from '../UserMenu/UserMenu';
import { NotificationsMenu } from '../NotificationsMenu/NotificationsMenu';

export const UserBar = () => {
  return (
    <div className={styles.main}>
      <LanguageMenu />
      <NotificationsMenu />
      <UserMenu />
    </div>
  );
}