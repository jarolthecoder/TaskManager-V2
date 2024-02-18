"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatDate } from "date-fns";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {

  const { tasksList } = useSelector((state) => state.tasks);
   const formattedToday = formatDate(new Date(), "PP");

  const completedTasksNum = tasksList.filter(
    (task) => task.status === "Completed"
  ).length;
  // const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const pendingTasksNum = tasksList.filter((task) => task.status === "Pending").length;
  const dueTasksNum = tasksList.filter((task) => task.dueDate === formattedToday && task.status !== "Completed").length;

  // Doughnut chart settings
  const data = {
    // labels: [`${completedTasksNum} Completed`, `${8} In Progress`, `${toDoTasksNum} Pending`],
    labels: [
      `${completedTasksNum} Completed`,
      `${pendingTasksNum} Pending`,
      `${dueTasksNum} Due Today`,
    ],
    datasets: [
      {
        data: [completedTasksNum, pendingTasksNum, dueTasksNum],
        backgroundColor: ["#2499EF", "rgb(255, 151, 119)", "rgb(255, 107, 147"],
        borderColor: [
          "#222B36", // Set to trasparent
        ],
        borderWidth: 5, // Donut border
        rotation: -190, // Rotates donut direction
        cutout: "70%", // Donut fill thickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        boxWidth: 30,
        labels: {
          textAlign: "left",
          boxWidth: 100, // adjust this value to change the width of the labels
          usePointStyle: true, // use custom shapes for the labels
          pointStyle: "circle", // specify the shape of the labels
          padding: 18, // padding for labels
          font: {
            size: 15,
          },
          color: "#fff",
        },
      },
    },
  };

  const plugin = {
    beforeInit(chart) {
      const originalFit = chart.legend.fit; // reference of original fit function
      // override the fit function
      chart.legend.fit = function fit() {
        // call original function and bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        // increase the width to add more space
        this.width += 20;
      };
    },
  };

  return (
    <div style={{marginTop: '1rem'}}>
      <Doughnut
        data={data}
        options={options}
        plugins={[plugin]}
        width={200}
        height={200}
      />
    </div>
  );
};
