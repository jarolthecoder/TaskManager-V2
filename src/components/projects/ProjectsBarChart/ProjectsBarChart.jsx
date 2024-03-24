"use client";

import { selectAllProjects } from "@/redux/features/projects";
import { formatDate } from "@/utils/helpers";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
} from "chart.js";
import { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler
);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  // "Jul",
  // "Aug",
  // "Sep",
  // "Oct",
  // "Nov",
  // "Dec",
];

export const ProjectsBarChart = () => {
  const projects = useSelector(selectAllProjects);
  const tasks = useMemo(
    () => projects.flatMap((project) => project.tasks),
    [projects]
  );

  // Function to count tasks created in a specific month
  const countTasksByMonth = (monthIndex) => {
    return tasks.filter((task) => {
      const creationDate = new Date(task.creationDate);
      return creationDate.getMonth() === monthIndex;
    });
  };

  // Function to calculate completion average for a specific month
  const calculateCompletionAverage = (monthIndex) => {
    const tasksForMonth = countTasksByMonth(monthIndex);
    if (tasksForMonth.length === 0) return 0;

    const completedTasks = tasksForMonth.filter(
      (task) => task.status === "completed"
    );
    return (completedTasks.length / tasksForMonth.length);
  };

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Number of tasks",
        backgroundColor: "rgb(133, 114, 238)",
        data: labels.map((_, index) => countTasksByMonth(index).length),
      },
      {
        type: "bar",
        label: "Completed task",
        backgroundColor: "#2599ef",
        data: labels.map(
          (_, index) =>
            countTasksByMonth(index).filter(
              (task) => task.status === "completed"
            ).length
        ),
      },
      {
        type: "line",
        label: "Progress",
        borderColor: "#73dce9",
        pointBorderColor: "#73dce9",
        pointBackgroundColor: "#73dce9",
        pointHoverBackgroundColor: "#73dce9",
        pointHoverBorderColor: "#73dce9",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        backgroundColor: "#73dce926",
        pointRadius: 2,
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        borderDash: [3, 3],
        data: labels.map((_, index) => calculateCompletionAverage(index)),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    // aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          textAlign: "left",
          usePointStyle: true, // use custom shapes for the labels
          pointStyle: "circle", // specify the shape of the labels
          padding: 15, // padding for labels
          color: "#b0b8c4",
          pointStyleWidth: 17,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked: false,
        grid: {
          display: true,
          drawTicks: false,
          color: "rgba(37, 46, 62, 0.177)",
        },
        ticks: {
          color: "#b0b8c4",
          padding: 10,
        },
      },
      y: {
        beginAtZero: true,
        stacked: false,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#b0b8c4",
          padding: 5,
        },
      },
    },

    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },

    elements: {
      bar: {
        borderWidth: 4,
        borderColor: "#ffff0000",
      },
    },
  };

  return (
    <Chart type="bar" data={data} options={options} height={window.innerWidth < 450 && 350}/>
  );
};
