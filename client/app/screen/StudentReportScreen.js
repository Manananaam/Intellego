import React from "react";
import Button from "react-bootstrap/Button";

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);

const response_data = [
  {
    id: 1,
    title: "Test Assessment 1 ",
    total_grade: 1,
  },
  {
    id: 5,
    title: "Test Assessment 2",
    total_grade: 3,
  },
];

export default function StudentReportScreen() {
  const data = {
    labels: response_data.map((el) => el.title),

    datasets: [
      {
        label: "Test chart",
        data: response_data.map((el) => el.total_grade),

        backgroundColor: "aqua",
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <div>
      <p className="">student name</p>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
}
