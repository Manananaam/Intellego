import React, { useEffect, useState } from "react";

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

// dummy data for a list of courses that teacher is in charge of
const courses = [
  {
    id: 14,
    name: "Test Course",
    subject: "ELA",
    gradeLevel: 3,
    createdAt: "2023-01-30T17:26:32.945Z",
    updatedAt: "2023-01-30T17:26:32.945Z",
    userId: 1,
    assessmentId: null,
  },
];

export default function StudentReportScreen() {
  // fetch a list of student belongs to the course
  const dispatch = useDispatch();
  const [currentCourse, setCurrentCourse] = useState(null);
  const { students } = useSelector((state) => state.studentEnroll);
  const { grades, student } = useSelector((state) => state.studentReport);

  useEffect(() => {
    if (currentCourse) {
      dispatch(fetchStudentList({ courseId: currentCourse }));
    }
  }, [currentCourse]);

  const handleStudentGradeReport = (student) => {
    dispatch(
      fetchGradeForEachAssessment({
        studentId: student.id,
        courseId: currentCourse,
      })
    );
  };

  const handleCurrentCourse = (course) => {
    setCurrentCourse(course.id);
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
        <Dropdown.Toggle>Course</Dropdown.Toggle>
        <Dropdown.Menu>
          {courses.map((course) => {
            return (
              <Dropdown.Item
                key={course.id}
                onClick={() => handleCurrentCourse(course)}
              >
                {course.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
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
