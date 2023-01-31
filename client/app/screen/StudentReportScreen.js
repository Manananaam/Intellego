import React, { useEffect, useState } from "react";

//Router
import { useLocation } from "react-router-dom";

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
// TODO: in courseRouter, get all course might involved authentication to get userId. that's why this router haven't completed yet, so I just use the dummy response to render to course dropdown menu
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
  // Router to fetch courseId, studentId
  const location = useLocation();
  const [courseId, studentId] = location.search
    .split("?")[1]
    .split("&")
    .map((el) => {
      const [key, value] = el.split("=");
      return { [key]: value };
    });
  console.log(courseId, studentId);

  // fetch a list of student belongs to the course
  const dispatch = useDispatch();
  // get current course
  const [currentCourse, setCurrentCourse] = useState(null);
  const { students } = useSelector((state) => state.studentEnroll);
  const { grades, student } = useSelector((state) => state.studentReport);

  useEffect(() => {
    if (currentCourse) {
      // fetch a list of students that belongs to the current Course
      dispatch(fetchStudentList({ courseId: currentCourse }));
    }
  }, [currentCourse]);

  // get grade report belongs to the student
  const handleStudentGradeReport = (student) => {
    dispatch(
      fetchGradeForEachAssessment({
        studentId: student.id,
        courseId: currentCourse,
      })
    );
  };

  // get current course
  const handleCurrentCourse = (course) => {
    setCurrentCourse(course.id);
  };

  console.log(student, grades);

  // chart data
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
      {currentCourse && (
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
      )}
      <p className="text-start">
        {student && `${student.firstName} ${student.lastName}`}
      </p>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
}
