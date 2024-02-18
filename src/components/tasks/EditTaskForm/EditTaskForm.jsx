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
import styles from "./EditTaskForm.module.css";
import { DevTool } from "@hookform/devtools";
import { useContext  } from "react";
import { AppContext } from "@/context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/utils/helpers/formatDate";
import { updateTask } from "@/redux/features/tasks/tasksSlice";

const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const EditTaskForm = () => {
  const { handleTaskModal } = useContext(AppContext);

  const dispatch = useDispatch();
  const {selectedTask} = useSelector((state) => state.tasks);

  const form = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: selectedTask,
  });

  const { register, formState, setValue } = form;
  const { errors } = formState;

  const onPriorityChange = (value) => {
    setValue("priority", value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const value = form.getValues();

    const updatedTask = {
      id: selectedTask.id,
      title: value.title,
      description: value.description,
      status: "Pending",
      startDate: formatDate(new Date(), "PP"),
      dueDate: value.dueDate,
      priority: value.priority,
    };

    dispatch(updateTask(updatedTask));
    handleTaskModal();
  };

  return (
    <>
      <form className={styles.task_form} onSubmit={handleFormSubmit}>
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
        <Button type="submit" label="Update Task" onClick={handleFormSubmit} />
      </form>
      <DevTool control={form.control} />
    </>
  );
};
