import { SearchBar } from "@/components/shared";
import { UserBar } from "@/components/user";
import styles from "./TopBar.module.css";

export const TopBar = () => {
  return (
    <header className={styles.main}>
      <div className={styles.col_left}>
        <SearchBar />
      </div>
      <div className={styles.col_right}>
        <UserBar />
      </div>
    </header>
  );
};
