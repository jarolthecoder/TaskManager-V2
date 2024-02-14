'use client'

import { useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";

export const usePopper = (refEl, popperEl, {placement = "bottom-start"} = {}) => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  
  // Toggle the popper open and close
  const togglePopper = () => {
    setIsPopperOpen((prevIsPopperOpen) => !prevIsPopperOpen);
  };

  // Close the popper when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popperEl.current &&
        !popperEl.current.contains(event.target) &&
        refEl.current &&
        !refEl.current.contains(event.target)
      ) {
        setIsPopperOpen(false);
      }
    };

    if (isPopperOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopperOpen, refEl, popperEl]);

  // Create the popper when the reference and popper elements are available
  useEffect(() => {
    if (refEl.current && popperEl.current) {
      createPopper(refEl.current, popperEl.current, {
        placement: placement,
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
    }
  }, [isPopperOpen]);

  return {
    isPopperOpen,
    togglePopper,
  };
};
