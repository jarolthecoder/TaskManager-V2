"use client"
import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollTop = window?.scrollY;
      setScrollTop(newScrollTop);
    };

    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollTop;
};
