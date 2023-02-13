import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
} from "chart.js";
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
import { Bar } from "react-chartjs-2";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import {
  fetchOverallGrade,
  fetchCourse,
} from "../store/slices/courseReportSlice";
import { fetchAllCourses } from "../store/slices/courseSlices";
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  canvasColor,
  spacing
);

export default function CourseReportScreen() {
  // export report chart
  let chartRef = useRef(null);
  const handleExport = () => {
    const link = document.createElement("a");
    link.download = `courseReport-${currentCourse.name}.png`;
    link.href = chartRef.current.toBase64Image();
    link.click();
  };

  // use router hook to fetch current courseId
  let [searchParams, setSearchParams] = useSearchParams();

  const courseId = Number(searchParams.get("courseId"));

  //fetch all courses to populate dropdown menu
  const allCourses = useSelector((state) => state.courses);

  //initial current course null, then select
  const [currentCourse, setCurrentCourse] = useState(null);

  //fetch grade/assessments once selected
  const allGrades = useSelector((state) => state.report.allGrades);
  //fetch all courses
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  //once course Id exists click course to update courseID in url
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourse(courseId));
    }
  }, [courseId]);

  // update current course once selected
  useEffect(() => {
    if (allCourses.length) {
      const course = allCourses.find((el) => el.id === courseId);
      setCurrentCourse(course);
    }
    if (courseId) {
      dispatch(fetchOverallGrade(courseId));
    }
  }, [allCourses, courseId]);

  // update current course when user clicks dropdown item
  const handleCurrentCourse = (course) => {
    searchParams.set("courseId", course.id);
    setSearchParams(searchParams);
  };

  //chart data
  const data = {
    labels:
      allGrades &&
      allGrades.map((obj) => {
        return `${obj.firstName} ${obj.lastName}`;
      }),

    datasets: [
      {
        label: "Student Overall Grade",
        data: allGrades && allGrades.map((obj) => obj.overall_grade),
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
      canvasColor,
      spacing,
      title: {
        display: true,
        text: `Student Grades: ${currentCourse?.name} `,
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
          text: "Overall Grade",
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
          text: "Student",
        },
      },
    },
  };

  //render chart
  let chart;
  if (currentCourse && allGrades && allGrades.length) {
    chart = (
      <div>
        <p className="">Course Report</p>
        <div
          style={{
            height: "690px",
            width: "690px",
            margin: "auto",
          }}
        >
          <Bar data={data} options={options} ref={chartRef}></Bar>
        </div>
      </div>
    );
  } else {
    chart = <p>Please select an active course. </p>;
  }
  return (
    <div>
      <Container>
        {currentCourse && allGrades && allGrades.length ? (
          <Button variant="primary" onClick={handleExport}>
            Export
          </Button>
        ) : null}
        <h1>Course Report</h1>
        <Dropdown>
          <Dropdown.Toggle>
            {currentCourse ? currentCourse.name : "Course"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {allCourses && allCourses.length ? (
              allCourses.map((course) => {
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
              <Dropdown.Item>No course yet</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        {currentCourse ? chart : <p>Please select a course</p>}
      </Container>
    </div>
  );
}
