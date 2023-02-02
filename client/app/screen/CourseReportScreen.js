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
import { fetchCourseReport, fetchCourseList, selectCourseReport, fetchCourse } from "../store/slices/courseReportSlice";

export default function CourseReportScreen() {
  // use router hook to fetch current courseId and studentId
  let [searchParams, setSearchParams] = useSearchParams();

  const courseId = Number(searchParams.get("courseId"));

  //fetch all courses to populate dropdown menu
  const allCourses = useSelector(selectCourseReport);

  //fetch grade/assessments once selected

  //initial current course
  const [currentCourse, setCurrentCourse] = useState();
  // (state) => state.currentCourse

  console.log(allCourses)
  // console.log(currentCourse)

  //fetch all courses
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourseList());
  }, []);

  //once course Id exists click course to update courseID in url
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourse(courseId));
    }
  }, [courseId]);

  // update current course once selected
  // useEffect(() => {
  //   if (allCourses.id === courseId) {
  //       setCurrentCourse(allCourses);
  //     } if (courseId) {
  //       dispatch(fetchCourseReport(courseId))
  //     }
  // }, [allCourses, courseId]);
  // console.log(currentCourse)


    // const data = {
    //   labels: allGrades.map((student) => student.studentName),

    //   datasets: [
    //     {
    //       label: "Course Report",
    //       data: allGrades.map((average) => average.gradeAverage),

    //       backgroundColor: "aqua",
    //       borderColor: "#000",
    //       borderWidth: 1,
    //     },
    //   ],
    // };

    let chart;
    // if (currentCourse && allGrades.length) {
    //   chart = (
    //     <div>
    //     <p className="">Course Report</p>
    //     <div style={{ width: "50%" }}>
    //       <Bar data={data} options={options}></Bar>
    //     </div>
    //   </div>)
    // } else {
    //   chart = <p>Please select an active course. </p>;
    // }

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
