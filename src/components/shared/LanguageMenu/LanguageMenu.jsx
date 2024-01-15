"use client";

import { useMenu } from "@/hooks/useMenu";
import Image from "next/image";
import { Menu, MenuItem } from "..";
import enFlag from "../../../../public/ic_flag_en.9a67c937.svg";
import deFlag from "../../../../public/ic_flag_de.7d35b6ca.svg";
import frFlag from "../../../../public/ic_flag_fr.35afd52c.svg";
import { useRef } from "react";

export const LanguageMenu = () => {
  const refEl = useRef();
  const { isMenuOpen, position, handleMenu } = useMenu(refEl);

  return (
    <>
      <div
        onClick={handleMenu}
        ref={refEl}
        style={{ cursor: "pointer" }}
      >
        <Image src={enFlag} alt="England flag" />
      </div>
      <Menu open={isMenuOpen} position={position}>
        {menuItems.map(({ label, icon }) => (
          <MenuItem key={label} onClick={handleMenu}>
            <Image src={icon} alt={`${label} flag`} />
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const menuItems = [
  { label: "English", icon: enFlag },
  { label: "German", icon: deFlag },
  { label: "French", icon: frFlag },
];
