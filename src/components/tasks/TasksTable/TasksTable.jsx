import { StatusBadge } from "..";
import { formatDate } from "date-fns";
import styles from "./TasksTable.module.css";

const tableColumns = ["Title", "Due Date", "Status", "Priority"];
const formattedToday = formatDate(new Date(), "PP");

export const TasksTable = ({ tasks }) => {
  return (
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
        {tasks.map((task, index) => (
          <tr key={index}>
            <td align="left">{task.title}</td>
            <td align="left">
              {task.dueDate === formattedToday ? "Today" : task.dueDate}
            </td>
            <td align="left">
              <StatusBadge status={task.status} />
            </td>
            <td align="left">
              <p
                style={{
                  color:
                    task.priority === "High"
                      ? "#E57373"
                      : task.priority === "Medium"
                      ? "#FFCC80"
                      : "#56e3c2",
                }}
              >
                {task.priority}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
