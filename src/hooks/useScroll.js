"use client";
import { useState, useEffect, useRef } from "react";

export const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? false : true;
      if (direction !== scrollTop && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollTop(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    }
  }, [scrollTop]);

  return scrollTop;
};
