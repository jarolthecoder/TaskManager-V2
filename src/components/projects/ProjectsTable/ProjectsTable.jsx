"use client";
import { selectAllProjects } from "@/redux/features/projects";
import { useSelector } from "react-redux";
import styles from "./ProjectsTable.module.css";
import { formatDate } from "@/utils/helpers";
import { Badge, MatIcon, ProgressBar } from "@/components/ui";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "@/hooks";

const tableColumns = [
  { title: "Project Name" },
  { title: "Tasks" },
  { title: "Progress" },
  { title: "Status" },
  { title: "Due Date" },
];
const formattedToday = formatDate(new Date(), "PP");

export const ProjectsTable = () => {
  const projects = useSelector(selectAllProjects);
  const projectsData = useMemo(() => {
    return projects
      .filter((project) => project.title !== "Unassigned")
      .map((project) => {
        const numOfTasks = project.tasks.length;
        const numOfCompletedTasks = project.tasks.filter(
          (task) => task.status === "completed"
        ).length;

        const progressPercentage =
          (numOfCompletedTasks / numOfTasks) * 100 || 0;

        return {
          title: project.title,
          status: project.status,
          tasks: numOfTasks,
          progress: progressPercentage,
          dueDate: project.dueDate,
        };
      });
  }, [projects]);

  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const { slicedData, tableRange } = useTable(projectsData, page, rowsPerPage);

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === tableRange[tableRange.length - 1]) return;
    setPage(page + 1);
  };

  useEffect(() => {
    if (slicedData.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slicedData, page, setPage]);

  return (
    <>
      <div className={styles.table_container}>
        <table className={styles.table_main}>
          <thead className={styles.table_head}>
            <tr>
              {tableColumns.map(({ title }) => (
                <th
                  key={title}
                  align="left"
                  colSpan={title === "Progress" && 2}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            {slicedData.map((project) => (
              <tr key={project.title}>
                <td>{project.title}</td>
                <td>{project.tasks}</td>
                <td colSpan={2}>
                  <ProgressBar progress={project.progress} showLabel />
                </td>
                <td>
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
                <td>
                  {project.dueDate === formattedToday
                    ? "Today"
                    : project.dueDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p className={styles.pagination_text}>
          Showing {slicedData.length} out of {projectsData.length} projects
        </p>
        <div className={styles.pagination_btn_container}>
          <button
            className={styles.pagination_control_btn}
            onClick={handlePrevPage}
          >
            <MatIcon iconName="navigate_before" />
          </button>
          {tableRange.map((el, index) => (
            <button
              key={index}
              className={`${styles.pagination_btn} ${
                page === el && styles.activeButton
              }`}
              onClick={() => setPage(el)}
            >
              {el}
            </button>
          ))}
          <button
            className={styles.pagination_control_btn}
            onClick={handleNextPage}
          >
            <MatIcon iconName="navigate_next" />
          </button>
        </div>
      </div>
    </>
  );
};
