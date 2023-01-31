import React, { useEffect } from "react";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentList } from "../store";

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
  // fetch a list of student belongs to the course
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentEnroll);
  useEffect(() => {
    dispatch(fetchStudentList({ courseId: 20 }));
  }, []);

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
      <Dropdown>
        <Dropdown.Toggle>Students</Dropdown.Toggle>
        <Dropdown.Menu>
          {students.map((student) => {
            return (
              <Dropdown.Item key={student.id}>
                {student.firstName} {student.lastName}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <p className="text-start">student name</p>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
}
