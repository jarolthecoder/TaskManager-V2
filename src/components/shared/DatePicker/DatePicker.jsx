"use client";

import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { isValid } from "date-fns";
import { DayPicker } from "react-day-picker";
import { usePopper } from "@/hooks";
import { formatDate } from "@/utils/helpers/formatDate";
import { Popper } from "..";
import styles from "./DatePicker.module.css";

export const DatePicker = ({
  label,
  id,
  name,
  register,
  setValue,
  placeholder,
  ...restOfProps
}) => {

  const inputRef = useRef(null);
  const popperRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { isPopperOpen, togglePopper } = usePopper(inputRef, popperRef);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const date = formatDate(e.target.value, "PP");
    if (isValid(date)) {
      setSelected(date);
      setValue(name, date);
    } else {
      setSelected(null);
      setValue(name, "");
    }
  };

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(formatDate(date, "PP"));
      setValue(name, formatDate(date, "PP"));
    } else {
      setInputValue(""); 
      setValue(name, "");
    }
    togglePopper();
  };
  const handlePopper = () => {
    togglePopper();
  };

  return (
    <div className={styles.input_group}>
      <label htmlFor={id}>{label}</label>
      <div ref={inputRef} className={styles.form_input}>
        <input
          type="text"
          id={id}
          name={name}
          onChange={handleInputChange}
          value={inputValue}
          placeholder={placeholder}
          {...register(id)}
          {...restOfProps}
          readOnly
        />
        <p className={styles.date_picker_icon} onClick={handlePopper}>
          <span className="material-icons">event</span>
        </p>
      </div>
      <Popper open={isPopperOpen} ref={popperRef}>
        <div className={styles.date_picker_container}>
          <DayPicker
            initialMonth={selected || new Date()}
            selected={selected}
            onDayClick={handleDaySelect}
          />
        </div>
      </Popper>
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};
