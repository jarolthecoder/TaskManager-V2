import { IconButton, LanguageMenu, MatIcon, NotificationsMenu } from "@/components/shared";
import { UserMenu } from "../UserMenu/UserMenu";
import styles from "./UserBar.module.css";

export const UserBar = () => {
  return (
    <div className={styles.main}>
      <LanguageMenu />
      <IconButton size="small">
        <MatIcon iconName="light_mode" />
      </IconButton>
      <NotificationsMenu />
      <UserMenu />
    </div>
  );
};
