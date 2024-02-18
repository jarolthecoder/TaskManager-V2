"use client";
import { useEffect, useRef } from "react";
import { usePopper } from "@/hooks";
import { Menu, Popper } from "..";
import PropTypes from "prop-types";
import styles from "./InputSelect.module.css";

export const InputSelect = ({
  children,
  value,
  label,
  id,
  name,
  onChange,
  error,
  errors,
  errorMessage,
  register,
  placeholder,
  ...restProps
}) => {

  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  useEffect(() => {
    togglePopper();
  }, [value]);

  return (
    <div ref={refEl} className={styles.select_group} {...restProps}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.select_input_container}>
        <input
          type="text"
          id={id}
          name={name}
          className={styles.select_input}
          placeholder={placeholder}
          readOnly
          onClick={togglePopper}
          {...register(id)}
        />
        <p className={styles.select_icon_btn} onClick={togglePopper}>
          <span className="material-icons">arrow_drop_down</span>
        </p>
      </div>
      <Popper ref={popperRef} open={isPopperOpen}>
        <Menu>{children}</Menu>
      </Popper>
    </div>
  );
};

InputSelect.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  errors: PropTypes.object,
  errorMessage: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
};