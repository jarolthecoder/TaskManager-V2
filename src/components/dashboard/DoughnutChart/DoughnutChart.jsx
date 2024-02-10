"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {

  // Doughnut chart settings
  const data = {
    labels: [
      `${20} Completed Tasks`,
      `${8} In Progress Tasks`,
      `${5} Pending Tasks`,
    ],
    datasets: [
      {
        data: [20, 8, 5],
        backgroundColor: ["#7C3AED", "#2299ee", "#d3d3d3"],
        borderColor: [
          "#FFF", // Set to trasparent
        ],
        borderWidth: 0, // Donut border
        rotation: -190, // Rotates donut direction
        cutout: "65%", // Donut fill thickness
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
          boxWidth: 100, // adjust this value to change the width of the labels
          usePointStyle: true, // use custom shapes for the labels
          pointStyle: "circle", // specify the shape of the labels
          padding: 18, // padding for labels
          font: {
            size: 15,
          },
          color: "#fff"
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
    <Doughnut
      data={data}
      options={options}
      plugins={[plugin]}
      width={200}
      height={200}
    />
  );
};
