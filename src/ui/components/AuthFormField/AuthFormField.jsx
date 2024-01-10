"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AuthFormField.module.css";
import { RenderWhen } from "../RenderWhen/RenderWhen";

export const AuthFormField = (props) => {
  const {
    label,
    id,
    type,
    name,
    onChange,
    fieldIcon,
    register,
    error,
    errors,
    errorMessage,
    ...restOfProps
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.input_group}>
      <label htmlFor={label}>{label}</label>
      <div
        className={`${styles.form_input} ${errors[name] ? styles.error : ""}`}
      >
        <input
          type={isPasswordVisible ? "text" : type}
          id={id}
          name={name}
          onChange={onChange}
          {...register(id)}
          // {...register(id, {
          //   required: {
          //     value: true,
          //     message: errorMessage,
          //   },
          // })}
          {...restOfProps}
        />
        <span
          className="material-icons"
          onClick={type === "password" ? togglePasswordVisibility : null}
          style={{ cursor: type === "password" ? "pointer" : "default" }}
        >
          <RenderWhen
            condition={type === "password" && isPasswordVisible}
            fallback={fieldIcon}
          >
            visibility_off
          </RenderWhen>
        </span>
      </div>
      {/* {error && <p className={styles.error}>{errorMessage}</p>} */}
      <p className={styles.error}>{errors[name] && errors[name].message}</p>
    </div>
  );
};

AuthFormField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  fieldIcon: PropTypes.string,
};