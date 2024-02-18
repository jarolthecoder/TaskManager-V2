"use client";

import { Calendar, DoughnutChart, StatsOfTheDay } from "@/components/dashboard";
import {
  Button,
  Card,
  MenuItem,
  Modal,
  Select,
} from "@/components/shared";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/helpers/formatDate";
import { useSelector } from "react-redux";
import styles from "./dashboard.module.css";
import { TasksTable } from "@/components/tasks";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const formattedToday = formatDate(new Date(), "PP");

export default function Dashboard() {

  const { tasksList } = useSelector((state) => state.tasks);

  const [filterValue, setFilterValue] = useState("All Tasks");
  const [filteredTasks, setFilteredTasks] = useState(tasksList);

  const handleFilterChange = (option) => {
    setFilterValue(option);
    switch (option) {
      case "All Tasks":
        setFilteredTasks(tasksList);
        break;
      case "Completed":
        const completedTasks = tasksList.filter(
          (task) => task.status === "Completed"
        );
        setFilteredTasks(completedTasks);
        break;
      case "Due Today":
        const inProgressTasks = tasksList.filter(
          (task) => task.dueDate === formattedToday
        );
        setFilteredTasks(inProgressTasks);
        break;
      case "Pending":
        const pendingTasks = tasksList.filter(
          (task) => task.status === "Pending"
        );
        setFilteredTasks(pendingTasks);
        break;
      default:
        setFilteredTasks(tasksList);
        break;
    }
  };

  useEffect(() => {
    setFilteredTasks(tasksList);
  }, [tasksList]);

  return (
    <section className={styles.main}>
      <div className={styles.panels_container}>
        <StatsOfTheDay tasks={tasksList} />
        <div className={styles.tables_container}>
          <div className={styles.table_card}>
            <div className={styles.table_card_header}>
              <h3>Tasks</h3>
              <Select value={filterValue}>
                {filterOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleFilterChange(option)}
                  >
                    <p>{option}</p>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <TasksTable tasks={filteredTasks} />
          </div>
          <div className={styles.table_card}>
            <div className={styles.table_card_header}>
              <h3>NotePad</h3>
            </div>
          </div>
        </div>
        <div className={styles.bottom_cards_container}>
          <Card className={styles.calendar_card}>
            <Calendar />
          </Card>
          <Card>
            <h2>Task's completition status</h2>
            <DoughnutChart />
          </Card>
          <Card>
            <h2>Task's completition status</h2>
            <DoughnutChart />
          </Card>
        </div>
      </div>
    </section>
  );
}
