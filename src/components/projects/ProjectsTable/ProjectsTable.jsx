"use client";
import { selectAllProjects } from "@/redux/features/projects";
import { useSelector } from "react-redux";
import styles from "./ProjectsTable.module.css";
import { formatDate } from "@/utils/helpers";
import { Badge, ProgressBar } from "@/components/ui";

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
          {projectsData.map((project, index) => (
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
    </div>
  );
};
