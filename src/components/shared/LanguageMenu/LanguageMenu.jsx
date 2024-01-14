import Image from 'next/image';
import engFlag from "../../../../public/ic_flag_en.9a67c937.svg";
import styles from './LanguageMenu.module.css'

export const LanguageMenu = () => {
  return (
    <div className={styles.language_select}>
      <Image src={engFlag} alt="England flag" />
    </div>
  );
}
