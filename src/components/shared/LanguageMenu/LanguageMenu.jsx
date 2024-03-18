"use client";

import { useRef } from "react";
import { usePopper } from "@/hooks";
import Image from "next/image";
import { IconButton, Menu, MenuItem, Popper } from "../../ui";
import enFlag from "../../../../public/ic_flag_en.9a67c937.svg";
import deFlag from "../../../../public/ic_flag_de.7d35b6ca.svg";
import frFlag from "../../../../public/ic_flag_fr.35afd52c.svg";

export const LanguageMenu = () => {
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  return (
    <>
      <div ref={refEl}>
        <IconButton size="small" onClick={togglePopper}>
          <Image 
            src={enFlag} 
            alt="England flag" 
            width={24}
            height={24}
          />
        </IconButton>
      </div>
      <Popper open={isPopperOpen} ref={popperRef}>
        <Menu>
          {menuItems.map(({ label, icon }) => (
            <MenuItem key={label} onClick={togglePopper}>
              <Image src={icon} alt={`${label} flag`} />
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Popper>
    </>
  );
};

const menuItems = [
  { label: "English", icon: enFlag },
  { label: "German", icon: deFlag },
  { label: "French", icon: frFlag },
];
