"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllTasks } from "@/redux/features/projects";
import { Calendar, DoughnutChart, StatsOfTheDay } from "@/components/dashboard";
import { Breadcrumbs, Button, Card, MenuItem, Modal, Select } from "@/components/shared";
import { TasksTable } from "@/components/tasks";
import { formatDate } from "@/utils/helpers/formatDate";
import styles from "./dashboard.module.css";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const formattedToday = formatDate(new Date(), "PP");
const todaysDateFull = formatDate(new Date(), "eeee, MMM d, yyyy");

export default function Dashboard() {
  const tasks = useSelector(selectAllTasks);

  const [filterValue, setFilterValue] = useState("All Tasks");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleFilterChange = (option) => {
    setFilterValue(option);
    switch (option) {
      case "All Tasks":
        setFilteredTasks(tasks);
        break;
      case "Completed":
        const completedTasks = tasks.filter(
          (task) => task.status === "completed"
        );
        setFilteredTasks(completedTasks);
        break;
      case "Due Today":
        const inProgressTasks = tasks.filter(
          (task) => task.dueDate === formattedToday
        );
        setFilteredTasks(inProgressTasks);
        break;
      case "Pending":
        const pendingTasks = tasks.filter((task) => task.status === "pending");
        setFilteredTasks(pendingTasks);
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <div>
          <Breadcrumbs />
          <h2>Hello Super User</h2>
        </div>
        <p className={styles.header_date}>{todaysDateFull}</p>
      </div>
      <div className={styles.panels_container}>
        <StatsOfTheDay tasks={tasks} />
        <div className={styles.tables_container}>
          <div className={styles.table_card}>
            <div className={styles.table_card_header}>
              <h2>Tasks</h2>
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
          <Card className={styles.calendar_card} color="dark">
            <Calendar />
          </Card>
          <Card color="dark">
            <h2>Task's completition status</h2>
            <DoughnutChart />
          </Card>
          <Card color="dark">
            <h2>Task's completition status</h2>
            <DoughnutChart />
          </Card>
        </div>
      </div>
    </section>
  );
}
