"use client";

import { useWindowSize } from "@/hooks";
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

  const {winWidth} = useWindowSize();

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
    return (completedTasks.length / tasksForMonth.length) * 100;
  };

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Tasks created",
        backgroundColor: "rgb(133, 114, 238)",
        data: labels.map((_, index) => countTasksByMonth(index).length),
      },
      {
        type: "bar",
        label: "Tasks completed",
        backgroundColor: "#2599ef",
        data: labels.map(
          (_, index) =>
            countTasksByMonth(index).filter(
              (task) => task.status === "completed"
            ).length
        ),
      },
      // {
      //   type: "line",
      //   label: "Tasks completed",
      //   borderColor: "#73dce9",
      //   pointBorderColor: "#73dce9",
      //   pointBackgroundColor: "#73dce9",
      //   pointHoverBackgroundColor: "#73dce9",
      //   pointHoverBorderColor: "#73dce9",
      //   pointBorderWidth: 2,
      //   pointHoverRadius: 5,
      //   pointHoverBorderWidth: 1,
      //   backgroundColor: "#73dce926",
      //   pointRadius: 3,
      //   tension: 0.4,
      //   fill: true,
      //   borderWidth: 2,
      //   borderDash: [3, 3],
      //   data: labels.map((_, index) => countTasksByMonth(index).filter(
      //     (task) => task.status === "completed" && new Date(task.endDate).getMonth() === index
      //     ).length),
      // },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    // aspectRatio: 2,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          usePointStyle: true, // use custom shapes for the labels
          padding: 15, // padding for labels
          color: "#b0b8c4",
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked: false,
        border: {
          display: false,
          color: "rgba(37, 46, 62, 0.299)",
        },
        grid: {
          display: false,
          drawTicks: false,
          color: "rgba(37, 46, 62, 0.299)",
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
          // display: false,
          drawTicks: false,
          color: "rgba(37, 46, 62, 0.299)",
        },
        ticks: {
          color: "#b0b8c4",
          padding: 10,
          stepSize: 1,
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
        borderWidth: 0,
        borderColor: "#ffff0000",
        categoryPercentage: 0,
        barPercentage: 0,
        borderRadius: winWidth < 600 ? 2 : 4,
      },
    },
  };

  return (
    <Chart
      type="bar"
      data={data}
      options={options}
      height={winWidth < 600 && 250}
    />
  );
};
