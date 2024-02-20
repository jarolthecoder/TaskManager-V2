import Image from 'next/image';
import logoImg from "../../../../public/task-manager-v2-logo.png";
import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <div className={styles.main}>
      {/* <div className={styles.logo}>
        <h1>T</h1>
      </div> */}
      <Image
        src={logoImg}
        alt="TaskManager"
        width={40}
        height={40}
        quality={100}
        />
      <p>TaskManager</p>
    </div>
  );
}
