import { tasksData } from "@/api/tasksData";
import styles from "./Table.module.css";
import { PriorityBadge } from "..";
import { formatDate } from "date-fns";

const tableColumns = ["Title", "Due Date", "Status", "Priority"];
const formattedToday = formatDate(new Date(), "PP");

export const Table = ({tasks}) => {

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
              <PriorityBadge priority={task.status} />
            </td>
            <td align="left">
              <p
                style={{
                  color:
                    task.priority === "High"
                      ? "#E17F41"
                      : task.priority === "Medium"
                      ? "#f4c47c"
                      : "#15CAB0",
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
