"use client";
import { useState, useEffect, useRef } from "react";

export const useScroll = () => {
  const lastScrollTop = useRef(0);
  const [scrollTop, setScrollTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollTop = window.scrollY;

      if (newScrollTop > lastScrollTop.current) {
        setScrollTop(false);
      } else if (newScrollTop < lastScrollTop.current || newScrollTop === 0) {
        setScrollTop(true);
      }

      lastScrollTop.current = newScrollTop;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollTop;
};
