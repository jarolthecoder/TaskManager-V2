import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[_\-!])[a-zA-Z0-9_\-!]+$/;

// Login schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordRegex,
      "Password must have at least one uppercase letter and include a special character"
    ),
});

// Register schema
export const registerSchema = yup.object({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordRegex,
      "Password must have at least one uppercase letter and include a special character"
    ),
  // confirmPassword: yup
  //   .string()
  //   .required("Confirm password is required")
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),
});