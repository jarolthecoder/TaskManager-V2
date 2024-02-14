"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "@/utils/validations/taskSchema";
import { FormField, Select, Button, DatePicker } from "@/components/shared";
import styles from "./TaskForm.module.css";

export const AddTaskForm = () => {
  const form = useForm({
    resolver: yupResolver(taskSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.task_form} onSubmit={handleFormSubmit}>
      <FormField
        label="Title"
        id="title"
        type="text"
        name="title"
        register={register}
        errors={errors}
      />
      <FormField
        label="Description"
        id="description"
        type="text"
        name="description"
        textarea
        register={register}
        errors={errors}
      />
      <div className={styles.field_group}>
        <DatePicker
          label="Due Date"
          id="dueDate"
          name="dueDate"
          register={register}
        />
        <Select label="Priority" options={priorityOptions} />
      </div>
      <Button type="submit" title="Create Task" onClick={handleFormSubmit} />
    </form>
  );
};
