import { MatIcon } from '..';
import styles from './SearchBar.module.css'

export const SearchBar = () => {
  return (
    <form className={styles.main}>
      <input
        type="text"
        className={styles.search_field}
        placeholder="Search"
      />
      <MatIcon  iconName="search" />
    </form>
  );
}
