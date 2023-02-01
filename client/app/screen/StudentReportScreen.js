import React, { useEffect, useState } from "react";

//Router
import { useSearchParams } from "react-router-dom";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchGradeForEachAssessment, getCourses } from "../store";
import { fetchCourseStudents } from "../store/slices/courseSlices";

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
  // use router hook to fetch current courseId and studentId
  let [searchParams, setSearchParams] = useSearchParams();

  const [courseId, studentId] = [
    Number(searchParams.get("courseId")),
    Number(searchParams.get("studentId")),
  ];

  const dispatch = useDispatch();
  // initial current course ans current student
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);

  // redux state
  // course with list of students belong to that course
  const courses = useSelector((state) => state.courses);
  // fetch a list of courses managed by current user
  const { allcourses } = useSelector((state) => state.studentEnroll);
  // fetch grades of each assessment belong to the student
  const { grades } = useSelector((state) => state.studentReport);

  // update courses and it's students list once courseId eixt in url or dropdown menu click a course to update courseId in url
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseStudents(courseId));
    }
  }, [courseId]);

  // update current course, current student, student report
  useEffect(() => {
    if (
      Object.keys(courses).length &&
      courses.id === courseId &&
      courses.students
    ) {
      setCurrentCourse(courses);
      setCurrentStudent(courses.students.find((el) => el.id === studentId));
      dispatch(
        fetchGradeForEachAssessment({
          courseId,
          studentId,
        })
      );
    }
  }, [courses, courseId, studentId]);

  // fetch a list of courses to display at course dropdown menu
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  // update current course when user click dropdown item
  const handleCurrentCourse = (course) => {
    searchParams.set("courseId", course.id);
    setSearchParams(searchParams);
  };
  // update current student when user click dropdown item
  const handleCurrentStudent = (student) => {
    searchParams.set("studentId", student.id);
    setSearchParams(searchParams);
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

  // conditional render chart or alert message
  let chart;
  if (currentStudent && grades.length) {
    chart = (
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    );
  } else if (grades.length === 0) {
    chart = <p>This course have 0 assessment.</p>;
  } else if (!currentStudent) {
    chart = <p>Please select a student</p>;
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle>
          {currentCourse ? currentCourse.name : "Course"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allcourses &&
            allcourses.length &&
            allcourses.map((course) => {
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
            {courses &&
              courses.id === courseId &&
              courses.students.map((student) => {
                return (
                  <Dropdown.Item
                    key={student.id}
                    onClick={() => handleCurrentStudent(student)}
                  >
                    {student.firstName} {student.lastName}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <p>
        {currentStudent &&
          `${currentStudent.firstName} ${currentStudent.lastName}`}
      </p>
      {chart}
    </div>
  );
}
