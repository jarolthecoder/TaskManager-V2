"use client"

import { useState } from "react";

export const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => setIsMenuOpen((prevState) => !prevState);

  return {
    isMenuOpen,
    handleMenu
  }
}
