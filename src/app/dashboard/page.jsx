"use client";

import {
  Calendar,
  ProjectsPreview,
  TasksPreview,
  DoughnutChart,
} from "@/components/dashboard";
import {
  Button,
  Card,
  Menu,
  MenuItem,
  Popper,
  Table,
} from "@/components/shared";
import styles from "./dashboard.module.css";
import { TaskStatCard } from "@/components/dashboard/";
import { tasksData } from "@/api/tasksData";
import { useRef, useState } from "react";
import { usePopper } from "@/hooks";
import { formatDate } from "@/utils/helpers/formatDate";

const filterOptions = ["All Tasks", "Completed", "Due Today", "Pending"];
const formattedToday = formatDate(new Date(), "PP");

export default function Dashboard() {
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const [filterValue, setFilterValue] = useState("All Tasks");
  const [filteredTasks, setFilteredTasks] = useState(tasksData);

  const handleFilterChange = (option) => {
    setFilterValue(option);
    switch (option) {
      case "All Tasks":
        setFilteredTasks(tasksData);
        break;
      case "Completed":
        const completedTasks = tasksData.filter(
          (task) => task.status === "Completed"
        );
        setFilteredTasks(completedTasks);
        break;
      case "Due Today":
        const inProgressTasks = tasksData.filter(
          (task) => task.dueDate === formattedToday
        );
        setFilteredTasks(inProgressTasks);
        break;
      case "Pending":
        const pendingTasks = tasksData.filter(
          (task) => task.status === "Pending"
        );
        setFilteredTasks(pendingTasks);
        break;
      default:
        setFilteredTasks(tasksData);
        break;
    }
    togglePopper();
  };

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <h2>Dashboard Overview</h2>
        <div>
          <Button title="New Task" align="right" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.col_left}>
          <TaskStatCard title="Due Today" icon="today" stat="1" />
          <TaskStatCard title="In Progress Tasks" icon="trending_up" stat="8" />
          <TaskStatCard title="Pending Tasks" icon="pending_actions" stat="5" />
          {/* <TasksPreview /> */}
          {/* <ProjectsPreview /> */}
        </div>
        <div className={styles.tables_container}>
          <div className={styles.table_card}>
            <div className={styles.table_card_header}>
              <h3>Tasks</h3>
              <div ref={refEl} className={styles.table_select}>
                <p className={styles.table_select_btn} onClick={togglePopper}>
                  {filterValue}
                  <span className="material-icons">arrow_drop_down</span>
                </p>
                <Popper ref={popperRef} open={isPopperOpen}>
                  <Menu>
                    {filterOptions.map((option, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => handleFilterChange(option)}
                      >
                        <p>{option}</p>
                      </MenuItem>
                    ))}
                  </Menu>
                </Popper>
              </div>
            </div>

            <Table tasks={filteredTasks} />
          </div>
          <div className={styles.table_card}>
            <div className={styles.table_card_header}>
              <h3>NotePad</h3>
            </div>
          </div>
        </div>

        <div className={styles.col_right}>
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
