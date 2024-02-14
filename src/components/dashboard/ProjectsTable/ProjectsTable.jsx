import { tasksData } from "@/api/tasksData";
import styles from "./ProjectsTable.module.css";

const tableColumns = ["Title", "Due Date", "Status"];

export const ProjectsTable = () => {
  const tasks = tasksData;

  return (
    <table className={styles.main}>
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
        {tasks.map((task, index) => (
          <tr key={index}>
            <td align="left">{task.title}</td>
            <td align="left">{task.dueDate}</td>
            <td align="left">{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
