import React, { useEffect, useState } from "react";
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
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import {
  fetchOverallGrade,
  fetchCourse,
} from "../store/slices/courseReportSlice";
import { fetchAllCourses } from "../store/slices/courseSlices";

export default function CourseReportScreen() {
  // use router hook to fetch current courseId and studentId
  let [searchParams, setSearchParams] = useSearchParams();

  const courseId = Number(searchParams.get("courseId"));

  //fetch all courses to populate dropdown menu
  const allCourses = useSelector((state) => state.courses);

  //fetch grade/assessments once selected
  const allGrades = useSelector((state) => state.report.allGrades);

  //initial current course
  const [currentCourse, setCurrentCourse] = useState(null);

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
      const course = allCourses.filter((el) => el.id === courseId);
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

  console.log(allGrades && allGrades.map((obj) => obj.overall_grade));

  const data = {
    labels: allGrades && allGrades.map((obj) => obj.id),

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

  let chart;
  if (currentCourse && allGrades && allGrades.length) {
    chart = (
      <div>
        <p className="">Course Report</p>
        <div style={{ width: "50%" }}>
          <Bar data={data} options={options}></Bar>
        </div>
      </div>
    );
  } else {
    chart = <p>Please select an active course. </p>;
  }

  const options = {
    responsive: true,
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={3} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={9} id="page-content-wrapper"></Col>
          <h1>Course Report</h1>
          <Dropdown>
            <Dropdown.Toggle>
              {currentCourse ? currentCourse.id : "Course"}
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
        </Row>
      </Container>
    </div>
  );
}
