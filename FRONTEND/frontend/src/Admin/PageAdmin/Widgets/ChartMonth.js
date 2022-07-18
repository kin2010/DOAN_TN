import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ChartMonth = ({ dt1, dt2, year1, year2 }) => {
  // console.log(dt1, dt2, year1);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Doanh thu ${year1} so với ${year2}`,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: year1,
        data: dt1
          ? labels.map((label, index) => dt1[index]?.revenue)
          : labels.map((label, index) =>
              faker.datatype.number({ min: 0, max: 1000 })
            ),

        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: year2,
        data: dt2
          ? labels.map((label, index) => dt2[index]?.revenue)
          : labels.map((label, index) =>
              faker.datatype.number({ min: 0, max: 1000 })
            ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
