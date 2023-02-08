import React, { useEffect, useState, useRef } from "react";

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
  Title,
} from "chart.js";
import ChartDataLables from "chartjs-plugin-datalabels";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  ChartDataLables,
  Title
);

export default function StudentReportScreen() {
  // export chart
  let chartRef = useRef(null);
  const handleExport = () => {
    const link = document.createElement("a");
    link.download = `studentReport-${currentStudent.firstName}${currentStudent.lastName}.png`;
    link.href = chartRef.current.toBase64Image();
    link.click();
  };

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
      courses &&
      Object.keys(courses).length &&
      courses.id === courseId &&
      courses.students
    ) {
      setCurrentCourse(courses);
      setCurrentStudent(courses.students.find((el) => el.id === studentId));
      // check query string both exsit, to prevent send invalid id as request to server
      if (courseId && studentId) {
        dispatch(
          fetchGradeForEachAssessment({
            courseId,
            studentId,
          })
        );
      }
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
        label: "Grade at each assessments",
        data: grades.map((el) => el.grade),
        backgroundColor: "aqua",
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    animation: {
      duration: 0,
    },
    plugins: {
      title: {
        display: true,
        text: `${currentStudent?.firstName} ${currentStudent?.lastName} Grade at Course: ${currentCourse?.name}`,
        font: {
          size: 32,
        },
      },
      datalabels: {
        display: true,
        color: "#111",
        font: {
          weight: "bold",
          size: 16,
        },
        anchor: "end",
        offset: -20,
        align: "start",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5,
        },
        title: {
          display: true,
          text: "Grade",
        },
      },
      x: {
        title: {
          display: true,
          text: "Assessment",
        },
      },
    },
  };

  // conditional render chart or alert message
  let chart;
  if (currentStudent && grades.length) {
    chart = (
      <div style={{ height: "690px", width: "690px", margin: "auto" }}>
        <Bar data={data} options={options} ref={chartRef}></Bar>
      </div>
    );
  } else {
    if (studentId && currentStudent && grades.length === 0) {
      // current student don’t have any submission for the assessments in the course
      chart = <p>Missing grades </p>;
    } else if (!studentId || (studentId && !currentStudent)) {
      // student have the studentId don’t belong to this course
      chart = <p>Please select a student who belongs to this course. </p>;
    }
  }
  return (
    <div>
      <button type="button" onClick={handleExport}>
        Export
      </button>
      <h1>Students Report</h1>
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
      {currentCourse ? chart : <p>Please select a course</p>}
    </div>
  );
}
