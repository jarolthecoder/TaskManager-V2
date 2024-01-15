"use client"

import {useState } from "react";

export const useMenu = (refEl) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  const getButtonPosition = () => {
    if (refEl.current) {
      const rect = refEl.current.getBoundingClientRect();
      setPosition({
        top: `${rect.bottom + window.scrollY + 20}px`,
        right: `${window.innerWidth - rect.right - window.scrollX - 20}px`,
      });
    }
  };

  const handleMenu = () => {
    getButtonPosition();
    setIsMenuOpen((prevState) => !prevState);
  };

  return {
    isMenuOpen,
    handleMenu,
    position
  };
}
