import Image from 'next/image';
import logoImg from "../../../../public/task-manager-v2-logo.png";
import PropTypes from 'prop-types';
import styles from './Logo.module.css'

export const Logo = ({ displayText = true }) => {
  return (
    <div className={`${styles.main} ${!displayText ? styles.flex_center : ''}`}>
      <Image
        src={logoImg}
        alt="TaskManager"
        width={40}
        height={40}
        quality={100}
      />
      {displayText && <p>TaskManager</p>}
    </div>
  );
}

Logo.propTypes = {
  displayName: PropTypes.bool
}