import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { subDays } from "date-fns";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import axiosClient from "../../../app/AxiosClient";
import { apiURL } from "../../../Context/constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Revenue by WEEK",
    },
  },
};

const labels = [
  "Monday",
  "Tueday",
  "Wednesday ",
  "Thursday ",
  "Friday ",
  "Saturday ",
  "Sunday",
];
// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

export const LineChart = ({ date }) => {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "REVENUE",
        data: labels.map((l, index) => date[index]?.revenue || 0),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  // console.log(faker.datatype.number({ min: 0, max: 1000 }));
  return <Line options={options} data={data} />;
};
