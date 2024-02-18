"use client";
import { useEffect, useRef } from "react";
import { usePopper } from "@/hooks";
import classNames from "classnames";
import { Menu, Popper } from "..";
import PropTypes from "prop-types";
import styles from "./Select.module.css";

export const Select = ({ children, value, className, ...restProps }) => {
  const selectClasses = classNames(styles.select, className);

  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  useEffect(() => {
    togglePopper();
  }, [value]);

  return (
    <div ref={refEl} className={selectClasses} {...restProps}>
      <button className={styles.select_btn} onClick={togglePopper}>
        <span className="material-icons">filter_list</span>
        {value}
        <span className="material-icons">arrow_drop_down</span>
      </button>
      <Popper ref={popperRef} open={isPopperOpen}>
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