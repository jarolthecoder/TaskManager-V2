import styles from './MenuItem.module.css'
import PropTypes from 'prop-types'

export const MenuItem = ({children, icon, onClick}) => {
  return (
    <li className={styles.main} role="menuitem" onClick={onClick}>
      <span className="material-icons">{icon}</span>
      {children}
    </li>
  );
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func
}