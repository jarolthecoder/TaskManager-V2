"use client"

import { useContext, useRef } from "react";
import { AppContext } from "@/context/AppContext";
import { usePopper } from "@/hooks";
import { useDispatch } from "react-redux";
import { Card, IconButton, Menu, MenuItem, Popper, ProgressBar } from "@/components/shared";
import { formatDate } from "@/utils/helpers/formatDate";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./ProjectCard.module.css";
import { truncateText } from "@/utils/helpers";
import { StatusBadge } from "@/components/tasks";

const formattedToday = formatDate(new Date(), "PP");

export const ProjectCard = ({ project }) => {

    const projectClasses = classNames(styles.project_card);


  const dispatch = useDispatch();
  const refEl = useRef(null);
  const popperRef = useRef(null);
  // const { handleprojectModal, setSelectedprojectAction } = useContext(AppContext);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const isDueToday = project.endDate === formattedToday;
  const dueDateShort = formatDate(new Date(project.endDate), "LLL d");


  const progressPercentage = project.progress;

  return (
    <Card className={projectClasses} color="dark">
      <div className={styles.project_header}>
        {/* <div className={styles.project_title}>
          <h4>{project.name}</h4>
        </div> */}
        <p className={styles.task_stat}>
          {/* <span className={`material-icons ${styles.stat_icon}`}>schedule</span> */}
          Due {isDueToday ? "Today" : dueDateShort}
        </p>

        <div ref={refEl}>
          <IconButton
            size="small"
            className={styles.project_options_btn}
            onClick={togglePopper}
          >
            <span className="material-icons">more_horiz</span>
          </IconButton>
        </div>
      </div>
      <div className={styles.project_body}>
        {/* <p className={styles.project_description}>
          {truncateText(project.description, 50)}
        </p> */}
        <div className={styles.project_title}>
          <h3>{project.name}</h3>
        </div>
        <div className={styles.project_progress}>
          <div className={styles.project_tasks}>
            <h4>Tasks</h4>
            <div className={styles.project_tasks_stat}>
              {/* <span class="material-icons">format_list_bulleted</span> */}
              <span>6</span>
              <span>/</span>
              <span>12</span>
            </div>
          </div>
          <ProgressBar progress={progressPercentage} />
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.project_footer}>
        <StatusBadge
          status="inProgress"
          variant="pill"
          // className={styles.project_status}
        />
      </div>
    </Card>
  );
};
