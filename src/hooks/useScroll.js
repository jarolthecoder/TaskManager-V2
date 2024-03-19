"use client"
import { useState, useEffect, useRef } from 'react';

export const useScroll = () => {
  const lastScrollTop = useRef(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    const newScrollTop = window?.scrollY;
    
    if (newScrollTop > lastScrollTop.current) {
      setScrollTop(false);
    } else if (newScrollTop < lastScrollTop.current) {
      setScrollTop(true);
    } 

    lastScrollTop.current = newScrollTop
  };
  useEffect(() => {
   

    window?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollTop;
};
