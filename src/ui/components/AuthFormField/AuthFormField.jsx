"use client"

import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AuthFormField.module.css";

export const AuthFormField = (props) => {
  const { label, id, type, name, value, onChange, fieldIcon, error, errorMessage, ...restOfProps } =
    props;
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.input_group}>
      <label htmlFor={label}>{label}</label>
      <div className={`${styles.form_input} ${ error ? styles.error : ""}`}>
        <input
          type={isPasswordVisible ? "text" : type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...restOfProps}
        />
        <span
          className="material-icons"
          onClick={type === "password" ? togglePasswordVisibility : null}
          style={{ cursor: type === "password" ? "pointer" : "default" }}
        >
          {type === "password" && isPasswordVisible
            ? "remove_red_eye"
            : fieldIcon}
        </span>
      </div>
      {error && (
        <p className={styles.error}>{errorMessage}</p>
      )}
    </div>
  );
};

AuthFormField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldIcon: PropTypes.string,
};