import React, { useEffect } from "react";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentList, fetchGradeForEachAssessment } from "../store";

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

export default function StudentReportScreen() {
  // fetch a list of student belongs to the course
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentEnroll);
  const { grades, student } = useSelector((state) => state.studentReport);

  useEffect(() => {
    dispatch(fetchStudentList({ courseId: 20 }));
  }, []);

  const handleStudentGradeReport = (student) => {
    console.log(student);
    dispatch(
      fetchGradeForEachAssessment({ studentId: student.id, courseId: 20 })
    );
  };

  console.log(student, grades);

  const data = {
    labels: grades.map((el) => el.title),
    datasets: [
      {
        label: "Test chart",
        data: grades.map((el) => el.total_grade),
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
              <Dropdown.Item
                key={student.id}
                onClick={() => handleStudentGradeReport(student)}
              >
                {student.firstName} {student.lastName}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <p className="text-start">
        {student && `${student.firstName} ${student.lastName}`}
      </p>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
}
