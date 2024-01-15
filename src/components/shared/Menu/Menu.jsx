import styles from './Menu.module.css'

export const Menu = ({ children, open }) => {

  if(open) {
    return (
      <div className={styles.main}>
        <ul>{children}</ul>
      </div>
    );
  }
}
