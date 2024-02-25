"use client";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { taskSchema } from "@/utils/validations/taskSchema";
import {
  selectAllProjects,
  selectTask,
  updateProject,
} from "@/redux/features/projects";
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
  const selectedTask = useSelector(selectTask);
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

  const onProjectNameChange = (value) => {
    setValue("projectName", value);
  };

  // Update the task in the project based on the new project value
  const updateProjectsTasks = (newProjectValue, updatedTask) => {
    return projects.map((project) => {
      // If the project title is different from the new project value then remove the task from the project
      if (project.title !== newProjectValue) {
        const updatedUnassignedProject = {
          ...project,
          tasks: project.tasks.filter((task) => task.id !== updatedTask.id),
        };

        dispatch(updateProject(updatedUnassignedProject));

        // If the project title is the same as the new project value and
        // the project title is different from the selected task project name then add the task to the project
      } else if (project.title === newProjectValue && project.title !== selectedTask.projectName) {
        const updatedProject = {
          ...project,
          tasks: [...project.tasks, updatedTask],
        };
        dispatch(updateProject(updatedProject));
      // If the project title is the same as the new project value and 
      // the project title is the same as the selected task project name then update the task in the project
      } else if (project.title === newProjectValue && project.title === selectedTask.projectName) {
        const updatedProject = {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
            ),
        };
        dispatch(updateProject(updatedProject));
      }

      return project;
    });
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

    updateProjectsTasks(value.projectName, updatedTask);
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
        <InputSelect
          label="Project"
          id="project-name"
          name="projectName"
          placeholder="Select project"
          register={register}
          value={form.watch("projectName")}
        >
          {projectsNames.map((option) => (
            <MenuItem
              key={option}
              value={option}
              onClick={() => onProjectNameChange(option)}
            >
              {option}
            </MenuItem>
          ))}
        </InputSelect>
      </div>
      <Button type="submit" label="Update Task" />
    </form>
  );
};
