"use client";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { taskSchema } from "@/utils/validations/taskSchema";
import { selectAllProjects, selectTask, updateTaskInProject } from "@/redux/features/projects";
import { AppContext } from "@/context/AppContext";
import {
  FormField,
  InputSelect,
  Button,
  DatePicker,
  MenuItem,
} from "@/components/shared";
import { formatDate } from "@/utils/helpers/formatDate";
import styles from "./EditTaskForm.module.css";

const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "inProgress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

export const EditTaskForm = () => {
  const { handleTaskModal } = useContext(AppContext);

  const dispatch = useDispatch();
  const selectedTask  = useSelector(selectTask);
  const projects = useSelector(selectAllProjects);
  const projectsNames = projects.map((project) => project.title);

  const form = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: selectedTask,
  });

  const { register, formState, handleSubmit, setValue } = form;
  const { errors } = formState;

  const onPriorityChange = (value) => {
    setValue("priority", value);
  };

  const onStatusChange = (option) => {
    setValue("status", option.label);
  };

  // To Review!
  const onProjectNameChange = (value) => {
    setValue("projectName", value);
  };

  const onFormSubmit = () => {
    const value = form.getValues();

    const updatedStatusValue = statusOptions.find(
      (option) => option.label === value.status
    );

    const updatedTask = {
      id: selectedTask.id,
      title: value.title,
      description: value.description,
      status: updatedStatusValue ? updatedStatusValue.value : value.status,
      startDate: formatDate(new Date(), "PP"),
      dueDate: value.dueDate,
      priority: value.priority,
      projectName: value.projectName,
    };

    dispatch(updateTaskInProject(updatedTask));
    handleTaskModal();
  };

  return (
    <form className={styles.task_form} onSubmit={handleSubmit(onFormSubmit)}>
      <FormField
        label="Title"
        id="title"
        type="text"
        name="title"
        placeholder="Enter title"
        register={register}
        errors={errors}
      />
      <FormField
        textarea
        label="Description"
        id="description"
        type="text"
        name="description"
        placeholder="Enter description"
        register={register}
        errors={errors}
      />
      <div className={styles.field_group}>
        <DatePicker
          label="Due Date"
          id="dueDate"
          name="dueDate"
          placeholder="Select date"
          register={register}
          setValue={setValue}
        />
        <InputSelect
          label="Priority"
          id="priority"
          name="priority"
          placeholder="Select priority"
          register={register}
          value={form.watch("priority")}
        >
          {priorityOptions.map((option) => (
            <MenuItem
              key={option.label}
              value={option}
              onClick={() => onPriorityChange(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </InputSelect>
      </div>
      <div className={styles.field_group}>
        <InputSelect
          label="Status"
          id="status"
          name="status"
          placeholder="Select status"
          register={register}
          value={form.watch("status")}
        >
          {statusOptions.map((option) => (
            <MenuItem
              key={option.label}
              value={option.value}
              onClick={() => onStatusChange(option)}
            >
              {option.label}
            </MenuItem>
          ))}
        </InputSelect>
      </div>
      <Button type="submit" label="Update Task" />
    </form>
  );
};
