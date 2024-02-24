"use client";
import { useRef } from "react";
import { usePopper } from "@/hooks";
import { MatIcon, Menu, Popper } from "..";
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

  return (
    <div
      ref={refEl}
      role="button"
      className={styles.select_group}
      {...restProps}
    >
      <label htmlFor={id}>{label}</label>
      <div className={styles.select_input_container}>
        <input
          type="text"
          id={id}
          name={name}
          className={styles.select_input}
          onClick={togglePopper}
          placeholder={placeholder}
          readOnly
          {...register(name)}
        />
        <p className={styles.select_icon_btn} onClick={togglePopper}>
          <MatIcon iconName="arrow_drop_down" />
        </p>
      </div>
      <Popper
        ref={popperRef}
        open={isPopperOpen}
        fullWidth
        onClose={togglePopper}
      >
        <Menu role="button">{children}</Menu>
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
