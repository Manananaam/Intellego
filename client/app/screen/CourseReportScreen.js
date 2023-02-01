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
import { fetchCourseReport, fetchCourseList } from "../store/slices/courseReportSlice";
import { fetchCourseAssesments } from "../store/slices/courseSlices";

export default function CourseReportScreen() {
  // const [ course, setCurrentCourse ] = UseState("")
  const { id } = useParams();
  const course = useSelector(selectCourseReport);
  const dispatch = useDispatch();

  console.log(course)

  useEffect(() => {
    dispatch(fetchCourseList(id));
  }, [dispatch, id]);

  // get current course
  // const [searchParams, setSearchParams] = //useSearchParams();
  // const [courseId] =[Number(searchParams.get//("courseId"))];

  // //initial state = no course selected yet
  // const [ currentCourse, setCurrentCourse ] = useState(null);
  // const [ courses, getCourses ] = useState(null);

  // //redux
  // //get course list
  // // const { allCourses, id } = useSelector((state) => state.report);

  // //select course and fetch list of students and assessments

  // const course = useSelector((state) => state.course)
  // const students = useSelector((state) => state.students)
  // const grades = useSelector((state) => state.report)
  // const dispatch = useDispatch();

  // //update selected list with the id or updated courseId in URL
  // useEffect(() => {
  //   if (courseId) {
  //     dispatch(fetchCourseList(courseId))
  //   };
  // }, [courseId]);

  // //get grade report belonging to the class
  //   useEffect(() => {
  //     if (
  //       Object.keys(courses).length && courses.id === courseId
  //     ) {
  //       setCurrentCourse(course);
  //       if (courseId) {
  //         dispatch(
  //           fetchCourseReport({
  //             courseId
  //           })
  //         )
  //       }
  //     }
  //   }, [course, courseId])

  // // fetch a list of courses to display at course dropdown menu
  // useEffect(() => {
  //   dispatch(getCourses());
  // }, []);

  //   // update current course when user click dropdown item
  //   const handleCurrentCourse = (course) => {
  //     searchParams.set("courseId", course.id);
  //     setSearchParams(searchParams);
  //   };

  // const handleCourseGradeReport = (student) => {
  //   dispatch(
  //     fetchCourseReport({
  //       courseId: currentCourse,
  //     })
  //   );
  // };

  // get current course
  // const handleCurrentCourse = (course) => {
  //   setCurrentCourse(course.id);
  //   console.log(course.id)
  // };

  // chart data
  // const data = {
  //   labels: grades.map((el) => el.title),
  //   datasets: [
  //     {
  //       label: "Test chart",
  //       data: grades.map((el) => el.total_grade),
  //       backgroundColor: "aqua",
  //       borderColor: "#000",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const options = {};

  return (
    <div>Hi
      {/* <Dropdown>
        <Dropdown.Toggle>Course</Dropdown.Toggle>
        <Dropdown.Menu>
          {courses.map((course) => {
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
          <Dropdown.Toggle>Students</Dropdown.Toggle>
          <Dropdown.Menu>
            {students.map((student) => {
              return (
                <Dropdown.Item
                  key={student.id}
                  onClick={() => handleCourseGradeReport(student)}
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
      </div> */}
    </div>
  );
};
