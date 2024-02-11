import PropTypes from "prop-types";
import styles from "./FormField.module.css";

export const FormField = ({
  label,
  id,
  type,
  name,
  onChange,
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
            onChange={onChange}
            rows={5}
          />
        ) : (
          <input
            type={type}
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
        )}
      </div>
      <p className={styles.error}>{errors[name] && errors[name].message}</p>
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  fieldIcon: PropTypes.string,
};
