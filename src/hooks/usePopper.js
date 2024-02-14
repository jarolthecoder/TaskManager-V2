'use client'

import { useState, useEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";

export const usePopper = (referenceElement, popperElement, options = {}) => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperInstanceRef = useRef(null);

  useEffect(() => {
    if (referenceElement.current && popperElement.current) {
      createPopper(referenceElement.current, popperElement.current, options);
    }

    return () => {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.destroy();
      }
    };
  }, [isPopperOpen]);

  const togglePopper = () => {
    setIsPopperOpen((prevIsPopperOpen) => !prevIsPopperOpen);
  };

  return {
    isPopperOpen,
    togglePopper,
    popperInstance: popperInstanceRef.current,
  };
};
