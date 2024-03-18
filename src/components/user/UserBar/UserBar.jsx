import { LanguageMenu, ThemeToggle } from "@/components/shared";
import { UserMenu } from "../UserMenu/UserMenu";
import { NotificationsMenu } from "../NotificationsMenu/NotificationsMenu";
import styles from "./UserBar.module.css";

export const UserBar = () => {

  return (
    <div className={styles.main}>
      <LanguageMenu />
      <ThemeToggle />
      <NotificationsMenu />
      <UserMenu />
    </div>
  );
};
