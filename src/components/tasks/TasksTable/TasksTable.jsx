import { formatDate } from "date-fns";
import { Badge } from "@/components/ui";
import styles from "./TasksTable.module.css";

const tableColumns = ["Task", "Due Date", "Status", "Priority"];
const formattedToday = formatDate(new Date(), "PP");

export const TasksTable = ({ tasks }) => {
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
          {tasks.map((task, index) => (
            <tr key={index}>
              <td align="left">{task.title}</td>
              <td align="left">
                {task.dueDate === formattedToday ? "Today" : task.dueDate}
              </td>
              <td align="left">
                <Badge
                  color={
                    task.status === "pending"
                      ? "pending"
                      : task.status === "inProgress"
                      ? "in-progress"
                      : "completed"
                  }
                >
                  {task.status}
                </Badge>
                {/* <StatusBadge status={task.status} /> */}
              </td>
              <td align="left">
                <Badge
                  color={
                    task.priority === "High"
                      ? "error"
                      : task.priority === "Medium"
                      ? "warning"
                      : "success"
                  }
                >
                  {task.priority}
                </Badge>
                {/* <p
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
                </p> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
