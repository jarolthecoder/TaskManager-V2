"use client";

import { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import PropTypes from "prop-types";
import styles from "./DatePicker.module.css";
import { parse, isValid, format } from "date-fns"; // Assuming you're using date-fns for date parsing and formatting
import { DayPicker } from "react-day-picker";
import { usePopper } from "@/hooks";
import { formatDate } from "@/utils/helpers/formatDate";

export const DatePicker = ({
  label,
  id,
  name,
  onChange,
  register,
  ...restOfProps
}) => {

  const inputRef = useRef(null);
  const popperRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");
   const { isPopperOpen, togglePopper } = usePopper(
     inputRef,
     popperRef,
     {
       placement: "bottom-start",
       modifiers: [
         {
           name: "preventOverflow",
           options: {
             boundary: "viewport",
           },
         },
       ],
     }
   );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const date = formatDate(e.target.value, "PP")
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(null);
    }
  };

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(formatDate(date, "PP"));
    } else {
      setInputValue("");
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
          {...register(id)}
        />
        <button className={styles.date_picker_icon} onClick={handlePopper}>
          <span className="material-icons">event</span>
        </button>
      </div>
      {isPopperOpen && (
        <div
          ref={popperRef}
          className={styles.date_picker}>
          <DayPicker
            initialMonth={selected || new Date()}
            selected={selected}
            onDayClick={handleDaySelect}
          />
        </div>
      )}
    </div>
  );
};