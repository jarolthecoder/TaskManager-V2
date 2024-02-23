"use client";
import { useState } from "react";
import { RenderWhen } from "@/components/shared";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./AuthFormField.module.css";

export const AuthFormField = ({
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
}) => {

  const inputGoupClasses = classNames(
    styles.input_group,
    errors[name] ? styles.error : ""
  );

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={inputGoupClasses}>
      <label htmlFor={label}>{label}</label>
      <div className={styles.form_input}>
        <input
          type={isPasswordVisible ? "text" : type}
          id={id}
          name={name}
          onChange={onChange}
          {...register(id)}
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
      <p className={styles.error_text}>
        {errors[name] && errors[name].message}
      </p>
    </div>
  );
};

AuthFormField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  fieldIcon: PropTypes.string,
};
