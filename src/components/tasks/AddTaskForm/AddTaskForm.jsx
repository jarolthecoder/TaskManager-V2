"use client";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "@/utils/validations/taskSchema";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewProject,
  selectAllProjects,
  selectProject,
  setSelectedProject,
  updateProject,
} from "@/redux/features/projects";
import { AppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/helpers/formatDate";
import { DatePicker } from "@/components/shared";
import {
  FormField,
  InputSelect,
  Button,
  MenuItem,
} from "@/components/ui";
import styles from "./TaskForm.module.css";

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

export const AddTaskForm = () => {
  const { handleTaskModal } = useContext(AppContext);

  const dispatch = useDispatch();
  const selectedProject = useSelector(selectProject);
  const projects = useSelector(selectAllProjects);
  const projectsNames = projects
    .filter((project) => project.title !== "Unassigned")
    .map((project) => project.title);

  const form = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: formattedToday,
      priority: "Low",
      status: "pending",
      projectName: selectedProject ? selectedProject.title : "Unassigned",
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

  const onProjectNameChange = (value) => {
    dispatch(
      setSelectedProject(projects.find((project) => project.title === value))
    );
    setValue("projectName", value);
  };

  const onFormSubmit = () => {
    const value = form.getValues();

    const newTask = {
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: value.title,
      description: value.description,
      status: value.status,
      creationDate: formattedToday,
      startDate: "",
      dueDate: value.dueDate,
      priority: value.priority,
      projectName: value.projectName === "" ? "Unassigned" : value.projectName,
    };

    const projectToUpdate = projects.find(
      (project) => project.title === value.projectName
    );

    if (value.projectName === "Unassigned" && projects.length === 0) {
      const unassignedProjectFolder = {
        title: "Unassigned",
        description: "Unassigned tasks",
        creationDate: formattedToday,
        dueDate: "",
        status: "",
        priority: "",
        tasks: [newTask],
      };
      dispatch(addNewProject(unassignedProjectFolder));
    } else {
      const updatedProject = {
        ...projectToUpdate,
        tasks: [...projectToUpdate.tasks, newTask],
      };
      dispatch(updateProject(updatedProject));
    }
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
            <MenuItem
              value="Unassigned"
              onClick={() => onProjectNameChange("Unassigned")}
            >
              Unassigned
            </MenuItem>
        </InputSelect>
      </div>
      <Button type="submit" label="Create Task" />
    </form>
  );
};
