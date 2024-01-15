'use client'

import { useState } from "react";
import Image from 'next/image';
import { Menu, MenuItem } from "..";
import enFlag from "../../../../public/ic_flag_en.9a67c937.svg";
import deFlag from "../../../../public/ic_flag_de.7d35b6ca.svg";
import frFlag from "../../../../public/ic_flag_fr.35afd52c.svg";
import styles from './LanguageMenu.module.css'

export const LanguageMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => setIsMenuOpen(prevState => !prevState);

  return (
    <div className={styles.main}>
      <div className={styles.lang_btn} onClick={handleMenu}>
        <Image src={enFlag} alt="England flag" />
      </div>
      <Menu open={isMenuOpen}>
        {menuItems.map(({ label, icon }) => (
          <MenuItem key={label} onClick={handleMenu}>
            <Image src={icon} alt={`${label} flag`} />
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const menuItems = [
  { label: 'English', icon: enFlag },
  { label: 'German', icon: deFlag },
  { label: 'French', icon: frFlag }
]