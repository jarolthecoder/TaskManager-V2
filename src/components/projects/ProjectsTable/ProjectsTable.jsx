"use client";
import { selectAllProjects } from "@/redux/features/projects";
import { useSelector } from "react-redux";
import styles from "./ProjectsTable.module.css";
import { formatDate } from "@/utils/helpers";
import { Badge, MatIcon, ProgressBar } from "@/components/ui";
import { useEffect, useState } from "react";
import { useTable } from "@/hooks";

const tableColumns = ["Project", "Status", "Tasks", "Progress", "Due Date"];
const formattedToday = formatDate(new Date(), "PP");

export const ProjectsTable = () => {
  const projects = useSelector(selectAllProjects);



  const projectsData = projects
    .filter((project) => project.title !== "Unassigned")
    .map((project) => {
      const numOfTasks = project.tasks.length;
      const numOfCompletedTasks = project.tasks.filter(
        (task) => task.status === "completed"
      ).length;
      const progressPercentage = (numOfCompletedTasks / numOfTasks) * 100 || 0;

      return {
        title: project.title,
        status: project.status,
        tasks: numOfTasks,
        progress: progressPercentage,
        dueDate: project.dueDate,
      };
    });

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(projectsData, page, 4);

     useEffect(() => {
       if (slice.length < 1 && page !== 1) {
         setPage(page - 1);
       }
     }, [slice, page, setPage]);

  return (
    <div className={styles.table_container}>
      <table className={styles.table_main}>
        <thead className={styles.table_head}>
          <tr>
            {tableColumns.map((column, index) => (
              <th key={index} align="left">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {slice.map((project, index) => (
            <tr key={project.id}>
              <td align="left">{project.title}</td>
              <td align="left">
                <Badge
                  color={
                    project.status === "pending"
                      ? "pending"
                      : project.status === "inProgress"
                      ? "in-progress"
                      : "completed"
                  }
                >
                  {project.status}
                </Badge>
              </td>
              <td>{project.tasks}</td>
              <td>
                <ProgressBar progress={project.progress} showLabel />
              </td>
              <td align="left">
                {project.dueDate === formattedToday ? "Today" : project.dueDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.table_footer}>
        <p>
          Showing {slice.length} out of {projectsData.length} projects
        </p>
        <div className={styles.pagination_btn_container}>
          <button
            className={styles.pagination_control_btn}
            // onClick={() => setPage(el)}
          >
            <MatIcon iconName="chevron_left" />
          </button>
          {range.map((el, index) => (
            <button
              key={index}
              className={`${styles.pagination_btn} ${
                page === el && styles.activeButton }`}
              onClick={() => setPage(el)}
            >
              {el}
            </button>
          ))}
          <button className={styles.pagination_control_btn}>
            <MatIcon iconName="chevron_right" />
          </button> 
        </div>
      </div>
    </div>
  );
};
