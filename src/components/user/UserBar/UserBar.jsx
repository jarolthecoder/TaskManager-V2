import { IconButton, LanguageMenu, NotificationsMenu } from "@/components/shared";
import { UserMenu } from "../UserMenu/UserMenu";
import styles from "./UserBar.module.css";

export const UserBar = () => {
  return (
    <div className={styles.main}>
      <LanguageMenu />
      <IconButton size="small">
        <span className="material-icons">light_mode</span>
      </IconButton>
      <NotificationsMenu />
      <UserMenu />
    </div>
  );
};
