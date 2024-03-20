"use client";
import { useState, useEffect } from "react";

export const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? false : true;
      if (direction !== scrollTop && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollTop(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollTop]);

  return scrollTop;
};
