"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProjects } from "@/redux/features/projects";
import { Breadcrumbs } from "@/components/shared";
import { Card, MatIcon, MenuItem, Select } from "@/components/ui";
import { Calendar, DoughnutChart, StatsOfTheDay } from "@/components/dashboard";
import { TasksTable } from "@/components/tasks";
import { formatDate } from "@/utils/helpers/formatDate";
import styles from "./dashboard.module.css";
import { ProductivityPanel } from "@/components/dashboard/ProductivityPanel/ProductivityPanel";
import { ProjectsTable } from "@/components/projects";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const formattedToday = formatDate(new Date(), "PP");
const todaysDateFull = formatDate(new Date(), "eeee, MMM d, yyyy");

export default function Dashboard() {
  const projects = useSelector(selectAllProjects);
  const tasks = useMemo(
    () =>
      projects
        .flatMap((project) => project.tasks)
        .sort(
          (taskA, taskB) =>
            new Date(taskB.creationDate) - new Date(taskA.creationDate)
        ),
    [projects]
  );

  const [filterValue, setFilterValue] = useState("All Tasks");

  const filteredTasks = useMemo(() => {
    switch (filterValue) {
      case "Completed":
        return tasks.filter((task) => task.status === "completed");
      case "Due Today":
        return tasks.filter((task) => task.dueDate === formattedToday);
      case "Pending":
        return tasks.filter((task) => task.status === "pending");
      case "All Tasks":
      default:
        return tasks;
    }
  }, [tasks, filterValue]);

  const handleFilterChange = (option) => {
    setFilterValue(option);
  };

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
          <Card className={styles.table_card} color="dark" padding="none">
            <div className={styles.table_card_header}>
              <h2>Active projects</h2>
              {/* <Select
                value={filterValue}
                startIcon={<MatIcon iconName="filter_list" />}
                endIcon="none"
              >
                {filterOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleFilterChange(option)}
                    selected={option === filterValue}
                  >
                    <p>{option}</p>
                  </MenuItem>
                ))}
              </Select> */}
            </div>
            {/* <TasksTable tasks={filteredTasks} /> */}
            <div className={styles.table_container}>
              <ProjectsTable />
            </div>
          </Card>
          <Card padding="none">
            <ProductivityPanel tasks={tasks} />
          </Card>
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
