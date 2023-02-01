import React, { useEffect, useState } from "react";

//Router
import { useSearchParams } from "react-router-dom";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentList,
  fetchGradeForEachAssessment,
  getCourses,
} from "../store";
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
    searchParams.get("courseId"),
    searchParams.get("studentId"),
  ];
  const dispatch = useDispatch();
  // initial current course ans current student
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);

  // redux state
  // courses data if user navigate from course student page
  const courses = useSelector((state) => state.courses);
  // fetch a list of students belong to the course
  const { students, allcourses } = useSelector((state) => state.studentEnroll);
  // fetch grades of each assessment and the student information
  const { student, grades } = useSelector((state) => state.studentReport);

  // clear query strin if one of courseId or studentId are missing
  useEffect(() => {
    if (!courseId || !studentId) {
      searchParams.delete("courseId"),
        searchParams.delete("studentId"),
        setSearchParams(searchParams);
    }
  }, []);

  // initial current course and student and get the grades for each assessment if user navigate from course student page
  useEffect(() => {
    if (courseId && studentId) {
      if (Object.keys(courses).length && courses.students) {
        setCurrentCourse(courses);
        setCurrentStudent(courses.students.find((el) => el.id === studentId));
        dispatch(
          fetchGradeForEachAssessment({
            courseId,
            studentId,
          })
        );
      } else {
        // fetch course with student if user refresh page in path:/report/students?courseId=${courseId}&studentId=${student.id}
        dispatch(fetchCourseStudents(courseId));
      }
    }
  }, [courses]);

  // fetch a list of courses
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  // if current course has changed, update the list of students
  useEffect(() => {
    if (currentCourse) {
      dispatch(fetchStudentList({ courseId: currentCourse.id }));
    }
  }, [currentCourse]);

  // if current student has changed, update the grades of each assessment
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

  // update current course when user click dropdown item
  const handleCurrentCourse = (course) => {
    searchParams.set("courseId", course.id);
    searchParams.delete("studentId");
    setSearchParams(searchParams);
    setCurrentCourse(course);
    setCurrentStudent(null);
  };
  // update current student when user click dropdown item
  const handleCurrentStudent = (student) => {
    searchParams.set("studentId", student.id);
    setSearchParams(searchParams);
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
            {students.map((student) => {
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
      <p className="text-start">
        {student && `${student.firstName} ${student.lastName}`}
      </p>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
}
