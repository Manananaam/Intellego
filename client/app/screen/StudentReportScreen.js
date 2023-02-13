import React, { useEffect, useState, useRef } from "react";

//Router
import { useSearchParams } from "react-router-dom";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchGradeForEachAssessment, getCourses } from "../store";
import { fetchCourseStudents } from "../store/slices/courseSlices";

// Chart

// customize canvas color of chart, so export chart have white background
const canvasColor = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
const spacing = {
  id: "increase-legend-spacing",
  beforeInit(chart) {
    // Get reference to the original fit function
    const originalFit = chart.legend.fit;

    // Override the fit function
    chart.legend.fit = function fit() {
      // Call original function and bind scope in order to use `this` correctly inside it
      originalFit.bind(chart.legend)();
      // Change the height as suggested in another answers
      this.height += 10;
    };
  },
};

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
import { ButtonGroup } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  ChartDataLables,
  Title,
  canvasColor,
  spacing
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
        label: "Assessment Grade",
        data: grades.map((el) => el.grade),
        backgroundColor: "#017296",
        borderColor: "#017296",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    animation: {
      duration: 0,
    },
    plugins: {
      canvasColor,
      spacing,
      title: {
        display: true,
        text: `${currentStudent?.firstName} ${currentStudent?.lastName} : ${currentCourse?.name}`,
        font: {
          size: 32,
        },
        color: "#111",
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
      legend: {
        labels: {
          color: "#111",
          font: {
            weight: "bold",
            size: 16,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5,
          color: "#111",
        },
        title: {
          display: true,
          text: "Grade",
          color: "#111",
        },
      },
      x: {
        ticks: {
          color: "#111",
        },
        title: {
          display: true,
          color: "#111",
          text: "Assessment",
        },
      },
    },
  };

  // conditional render chart or alert message
  let chart;
  if (currentStudent && grades.length) {
    chart = (
      <div
        style={{
          padding: "20px 0 0 0",
          height: "auto",
          width: "690px",
          margin: "auto",
        }}
      >
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
    <Container>
      <h1>Student Report</h1>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle className="orangeButton">
          {currentCourse ? currentCourse.name : "Select a Course"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allcourses && allcourses.length ? (
            allcourses.map((course) => {
              return (
                <Dropdown.Item
                  key={course.id}
                  onClick={() => handleCurrentCourse(course)}
                >
                  {course.name}
                </Dropdown.Item>
              );
            })
          ) : (
            <Dropdown.Item>No courses</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {currentCourse && (
        <Dropdown as={ButtonGroup} style={{ marginLeft: "10px" }}>
          <Dropdown.Toggle className="orangeButton">
            {currentStudent
              ? `${currentStudent.firstName} ${currentStudent.lastName}`
              : "Select a Student"}
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
      )}{" "}
      {currentCourse && currentStudent && (
        <Button
          variant="primary"
          onClick={handleExport}
          style={{
            float: "right",
            position: "relative",
            backgroundColor: "#017296",
          }}
        >
          Export
        </Button>
      )}
      {/* <p>
        {currentStudent &&
          `${currentStudent.firstName} ${currentStudent.lastName}`}
      </p> */}
      {currentCourse ? chart : null}
    </Container>
  );
}
