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
import { Bar } from "react-chartjs-2";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import {
  fetchOverallGrade,
  fetchCourse,
} from "../store/slices/courseReportSlice";
import { fetchAllCourses } from "../store/slices/courseSlices";
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);

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
        label: "Course Report",
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
  };

  //render chart
  let chart;
  if (currentCourse && allGrades && allGrades.length) {
    chart = (
      <div>
        <p className="">Course Report</p>
        <div style={{ width: "50%" }}>
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
        {currentCourse && (
          <Button variant="primary" onClick={handleExport}>
            Export
          </Button>
        )}
        <h1>Course Report</h1>
        <Dropdown>
          <Dropdown.Toggle>
            {currentCourse ? currentCourse.name : "Course"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {allCourses &&
              allCourses.length &&
              allCourses.map((course) => {
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
        {currentCourse ? chart : <p>Please select a course</p>}
      </Container>
    </div>
  );
}
