"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "@/utils/validations/taskSchema";
import {
  FormField,
  InputSelect,
  Button,
  DatePicker,
  MenuItem,
} from "@/components/shared";
import styles from "./TaskForm.module.css";
import { DevTool } from "@hookform/devtools";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useDispatch } from "react-redux";
import { formatDate } from "@/utils/helpers/formatDate";
import { addTask } from "@/redux/features/tasks/tasksSlice";

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

const assignedToOptions = [
  { value: "Other", label: "Stuff" },
  { value: "Web Development", label: "Web Developement" },
  { value: "Design", label: "Design" },
];

const formattedToday = formatDate(new Date(), "PP");

export const AddTaskForm = () => {
  const { handleTaskModal } = useContext(AppContext);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: formattedToday,
      priority: "Low",
      status: "pending",
      assignedTo: "",
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

  const onAssignedToChange = (value) => {
    setValue("assignedTo", value);
  };

  const onFormSubmit = () => {

    const value = form.getValues();

    const newTask = {
      id: `TSK-${Math.floor(Math.random() * 1000)}`,
      title: value.title,
      description: value.description,
      status: value.status,
      startDate: formattedToday,
      dueDate: value.dueDate,
      priority: value.priority,
      assignedTo: value.assignedTo === "" ? "Unassigned" : value.assignedTo,
    };

    dispatch(addTask(newTask));

    handleTaskModal(); 
  };

  return (
    <>
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
          <InputSelect
            label="Project"
            id="assigned-to"
            name="assignedTo"
            placeholder="Select project"
            register={register}
            value={form.watch("assignedTo")}
          >
            {assignedToOptions.map((option) => (
              <MenuItem
                key={option.label}
                value={option.value}
                onClick={() => onAssignedToChange(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </InputSelect>
        </div>
        <Button type="submit" label="Create Task"/>
      </form>
      {/* <DevTool control={form.control} /> */}
    </>
  );
};
