import * as yup from "yup";

export const projectSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  status: yup.string(),
  // .required("Status is required"),
  dueDate: yup.string(),
  // .required("Due date is required"),
});
