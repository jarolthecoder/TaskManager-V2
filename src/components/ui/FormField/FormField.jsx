import PropTypes from "prop-types";
import styles from "./FormField.module.css";

export const FormField = ({
  label,
  id,
  type = 'text',
  name,
  placeholder,
  fieldIcon,
  register,
  textarea,
  error,
  errors,
  errorMessage,
  ...restOfProps
}) => {
  return (
    <div className={styles.input_group}>
      <label htmlFor={id}>{label}</label>
      <div
        className={`${styles.form_input} ${errors[name] ? styles.error : ""}`}
      >
        {textarea ? (
          <textarea
            id={id}
            name={name}
            className={styles.form_textarea}
            placeholder={placeholder}
            rows={5}
            {...register(id)}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            {...register(id)}
            {...restOfProps}
          />
        )}
      </div>
      <p className={styles.error}>{errors[name] && errors[name].message}</p>
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  fieldIcon: PropTypes.string,
  register: PropTypes.func,
  textarea: PropTypes.bool,
  error: PropTypes.string,
  errors: PropTypes.object,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
};
