import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);

const dummyData = [
  {
    id: 1,
    studentName: "Student A",
    gradeAverage: 82,
  },
  {
    id: 2,
    studentName: "Student B",
    gradeAverage: 79,
  },
  {
    id: 3,
    studentName: "Student C",
    gradeAverage: 85,
  },
  {
    id: 4,
    studentName: "Student D",
    gradeAverage: 86,
  },
  {
    id: 5,
    studentName: "Student F",
    gradeAverage: 84,
  },
  {
    id: 6,
    studentName: "Student G",
    gradeAverage: 82,
  },
];

export default function CourseReport () {
  const data = {
    labels: dummyData.map((student) => student.studentName),

    datasets: [
      {
        label: "Course Report",
        data: dummyData.map((average) => average.gradeAverage),

        backgroundColor: "aqua",
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true
  };
  return (
    <div>
      <p className="">Course Report</p>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
};
