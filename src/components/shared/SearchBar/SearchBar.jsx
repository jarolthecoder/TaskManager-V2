import styles from './SearchBar.module.css'

export const SearchBar = () => {
  return (
    <form className={styles.main}>
      <input
        type="text"
        className={styles.search_field}
        placeholder="Search"
      />
      <span className="material-icons-outlined">search</span>
    </form>
  );
}
