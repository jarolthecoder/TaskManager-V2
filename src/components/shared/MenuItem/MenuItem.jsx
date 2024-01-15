import { RenderWhen } from '..';
import styles from './MenuItem.module.css'
import PropTypes from 'prop-types'

export const MenuItem = ({children, icon, onClick}) => {
  return (
    <li className={styles.main} role="menuitem" onClick={onClick}>
      <RenderWhen condition={icon}>
        <span className="material-icons">{icon}</span>
      </RenderWhen>
      {children}
    </li>
  );
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func
}