"use client";

import PropTypes from "prop-types";
import styles from "./Select.module.css"
import { useState } from "react";

export const Select = ({
  label,
  id,
  name,
  onChange,
  error,
  errors,
  errorMessage,
  options = []
}) => {

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.input_group}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.form_input}>
        <select
          id={id}
          name={name}
          value={selectedValue}
          className={styles.select}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
