"use client";
import { useRef } from "react";
import { usePopper } from "@/hooks";
import { Menu, Popper } from "..";
import PropTypes from "prop-types";
import styles from "./Select.module.css";
import classNames from "classnames";

export const Select = ({ children, value, className, startIcon, endIcon, ...restProps }) => {
  const selectClasses = classNames(styles.select, className);

  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  return (
    <div ref={refEl} className={selectClasses} {...restProps}>
      <button className={styles.select_btn} onClick={togglePopper}>
        {startIcon}
        {value}
        {endIcon && endIcon !== "none"
          ? endIcon
          : endIcon === "none" 
          ? null 
          : (
          <span
            className="material-icons"
            style={{
              transform: isPopperOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            keyboard_arrow_down
          </span>
        )}
      </button>
      <Popper ref={popperRef} open={isPopperOpen} onClose={togglePopper}>
        <Menu>{children}</Menu>
      </Popper>
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  className: PropTypes.string,
};
