import React, { useEffect, useState } from "react";

//Router
import { useLocation } from "react-router-dom";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentList, fetchGradeForEachAssessment } from "../store";
import { fetchAllCourses } from "../store/slices/courseSlices";

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
  // Router to fetch courseId, studentId
  const location = useLocation();

  const [courseId, studentId] =
    location.search.length > 0
      ? location.search
          .split("?")[1]
          .split("&")
          .map((el) => {
            const [key, value] = el.split("=");
            return { id: value };
          })
      : [null, null];
  console.log("search query", courseId, studentId);

  // fetch a list of student belongs to the course
  const dispatch = useDispatch();
  // get current course
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);

  console.log("current course", currentCourse);
  // redux state
  const courses = useSelector((state) => state.courses);
  const { students } = useSelector((state) => state.studentEnroll);
  const { student, grades } = useSelector((state) => state.studentReport);

  useEffect(() => {
    if (courseId && studentId && Object.keys(courses).length) {
      setCurrentCourse(courses);
      setCurrentStudent(courses.students[0]);
      dispatch(
        fetchGradeForEachAssessment({
          studentId: courseId.id,
          courseId: studentId.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  useEffect(() => {
    if (currentCourse) {
      dispatch(fetchStudentList({ courseId: currentCourse.id }));
    }
  }, [currentCourse]);

  useEffect(() => {
    if (currentStudent) {
      dispatch(
        fetchGradeForEachAssessment({
          studentId: currentStudent.id,
          courseId: currentCourse.id,
        })
      );
    }
  }, [currentStudent]);

  // get current course
  const handleCurrentCourse = (course) => {
    setCurrentCourse(course);
    setCurrentStudent(null);
  };
  // get current student
  const handleStudentGradeReport = (student) => {
    setCurrentStudent(student);
  };

  // chart data
  const data = {
    labels: grades.map((el) => el.title),
    datasets: [
      {
        label: "Test chart",
        data: grades.map((el) => el.grade),
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
        <Dropdown.Toggle>
          {currentCourse ? currentCourse.name : "Course"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {courses &&
            courses.length &&
            courses.map((course) => {
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
          <Dropdown.Toggle>
            {currentStudent
              ? `${currentStudent.firstName} ${currentStudent.lastName}`
              : "Student"}
          </Dropdown.Toggle>
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
