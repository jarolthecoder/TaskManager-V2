"use client";

import { useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppContext } from "@/context/AppContext";
import { usePopper } from "@/hooks";
import {
  Card,
  IconButton,
  MatIcon,
  Menu,
  MenuItem,
  Popper,
  ProgressBar,
} from "@/components/ui";
import { formatDate } from "@/utils/helpers/formatDate";
import { setSelectedProject } from "@/redux/features/projects";
import { PROJECT_ACTIONS } from "@/lib/constants";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./ProjectCard.module.css";

const { EDIT_PROJECT, DELETE_PROJECT } = PROJECT_ACTIONS;

const formattedToday = formatDate(new Date(), "PP");

export const ProjectCard = ({ project }) => {

  const projectClasses = classNames(styles.project_card);

  const router = useRouter();
  const dispatch = useDispatch();
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { handleProjectModal, setSelectedProjectAction } = useContext(AppContext);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const isDueToday = project.dueDate === formattedToday;
  const dueDateShort = formatDate(new Date(project.dueDate), "LLL d");
  const numOfTasks = project.tasks.length;
  const numOfCompletedTasks = project.tasks.filter((task) => task.status === "completed").length;
  const progressPercentage = (numOfCompletedTasks / numOfTasks) * 100 || 0;

  const handleViewProject = () => {
    dispatch(setSelectedProject(project));
    router.push(`/projects/${project.id}`);
  };

  const handleSelectEdit = () => {
    dispatch(setSelectedProject(project));
    handleProjectModal();
    setSelectedProjectAction(EDIT_PROJECT);
    togglePopper();
  };

  const handleSelectDelete = () => {
    dispatch(setSelectedProject(project));
    handleProjectModal();
    setSelectedProjectAction(DELETE_PROJECT);
    togglePopper();
  };

  return (
    <Card className={projectClasses} color="dark">
      <div className={styles.project_header}>
        <div className={styles.project_title}>
          <small className={styles.task_stat}>
            Due {isDueToday ? "Today" : dueDateShort}
          </small>
          <h3 onClick={handleViewProject}>{project.title}</h3>
        </div>
        <div ref={refEl}>
          <IconButton
            size="small"
            className={styles.project_options_btn}
            onClick={togglePopper}
          >
            <MatIcon iconName="more_horiz" />
          </IconButton>
        </div>
        <Popper ref={popperRef} open={isPopperOpen}>
          <Menu>
            <MenuItem icon="visibility" onClick={handleViewProject}>
              <p>View</p>
            </MenuItem>
            <MenuItem icon="edit" onClick={handleSelectEdit}>
              <p>Edit</p>
            </MenuItem>
            <MenuItem icon="delete" onClick={handleSelectDelete}>
              <p>Delete</p>
            </MenuItem>
          </Menu>
        </Popper>
      </div>
      <div className={styles.project_body}>
        <div className={styles.project_progress}>
          <div className={styles.project_tasks}>
            <div className={styles.project_tasks_title}>
              <h4>Tasks</h4>
            </div>
            <div className={styles.project_tasks_stat}>
              <MatIcon iconName="format_list_bulleted" size="small" />
              <div>
                <span>{numOfCompletedTasks}</span>
                <span>/</span>
                <span>{numOfTasks}</span>
              </div>
            </div>
          </div>
          <ProgressBar progress={progressPercentage} />
        </div>
      </div>
      <div className={styles.project_footer}>
      </div>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};