"use client";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "@/context/AppContext";
import { DatePicker } from "@/components/shared";
import {
  FormField,
  InputSelect,
  Button,
  MenuItem,
} from "@/components/ui";
import { formatDate } from "@/utils/helpers/formatDate";
import { addNewProject } from "@/redux/features/projects";
import { projectSchema } from "@/utils/validations";
import styles from "./ProjectForm.module.css";

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

const formattedToday = formatDate(new Date(), "PP");

export const AddProjectForm = () => {
  const { handleProjectModal } = useContext(AppContext);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: formattedToday,
      priority: "Low",
      status: "pending",
    },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  const onPriorityChange = (value) => {
    setValue("priority", value);
  };

  const onStatusChange = (value) => {
    setValue("status", value);
  };

  const onFormSubmit = () => {
    const value = form.getValues();

    const newProject = {
      title: value.title,
      description: value.description,
      status: value.status,
      creationDate: formattedToday,
      startDate: "",
      dueDate: value.dueDate,
      priority: value.priority,
      tasks: [],
    };

    

    dispatch(addNewProject(newProject));
    handleProjectModal();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
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
                value={option.value}
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
                onClick={() => onStatusChange(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </InputSelect>
        </div>
        <Button type="submit" label="Create Project" />
      </form>
    </>
  );
};
