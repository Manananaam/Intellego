import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
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
import { fetchCourseReport, fetchCourseList, selectCourseReport, fetchSubmissions } from "../store/slices/courseReportSlice";
import { fetchCourseAssesments } from "../store/slices/courseSlices";
import { current } from "@reduxjs/toolkit";
import { fetchGradeForEachAssessment } from "../store";

export default function CourseReportScreen() {
  // use router hook to fetch current courseId and studentId
  let [searchParams, setSearchParams] = useSearchParams();

  const courseId = Number(searchParams.get("courseId"));

  const dispatch = useDispatch();

  const allCourses = useSelector(selectCourseReport);

  const [currentCourse, setCurrentCourse] = useState(null);
  const [allGrades, setAllGrades] = useState(null);

  console.log(allCourses)
  console.log(currentCourse)

  useEffect(() => {
    dispatch(fetchCourseList());
  }, []);

  useEffect(() => {
    dispatch(fetchCourseReport());
  }, []);


    const data = {
      labels: allGrades.map((student) => student.studentName),

      datasets: [
        {
          label: "Course Report",
          data: allGrades.map((average) => average.gradeAverage),

          backgroundColor: "aqua",
          borderColor: "#000",
          borderWidth: 1,
        },
      ],
    };

    let chart;
    if (currentCourse && allGrades.length) {
      chart = (
        <div>
        <p className="">Course Report</p>
        <div style={{ width: "50%" }}>
          <Bar data={data} options={options}></Bar>
        </div>
      </div>)
    } else {
      chart = <p>Please select an active course. </p>;
    }




    const options = {
      responsive: true
    };

  return (
 <div>
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
                  // onClick={() => handleCurrentCourse(course)}
                >
                  {course.name}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
      {currentCourse ? chart : <p>Please select a course</p>}
    </div>
  )
};
