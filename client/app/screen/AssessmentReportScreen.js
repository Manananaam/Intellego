import React, { useEffect, useState } from "react";

//Router
import { useSearchParams } from "react-router-dom";

//Bootstrap
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

//redux
import { getCourses } from "../store";
import { fetchCourseAssessments } from "../store";
import { useDispatch, useSelector } from "react-redux";

const AssessmentReportScreen = () => {
  const dispatch = useDispatch();

  // use router hook to fetch current courseId
  let [searchParams, setSearchParams] = useSearchParams();

  const [courseId, assessmentId] = [
    Number(searchParams.get("courseId")),
    Number(searchParams.get("assessmentId"))
  ];

  // initial current course ans current student
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentAssessment, setCurrentAssessment] = useState(null);

  // redux state
  // fetch a list of courses managed by current user
  const { allcourses } = useSelector((state) => state.studentEnroll);
  //need a course with list of assessments that belong to that course
  const courses = useSelector((state) => state.courses);

  //useEffect here to update the assessments fetch based on course id change
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseAssessments(courseId));
    }
  }, [courseId]);

  // update current course, current assessment
  useEffect(() => {
    if (
      courses &&
      Object.keys(courses).length &&
      courses.id === courseId &&
      courses.assessments
    ) {
      setCurrentCourse(courses);
      setCurrentAssessment(
        courses.assessments.find((el) => el.id === assessmentId)
      );
    }
  }, [courses, courseId, assessmentId]);

  // fetch a list of courses to display at course dropdown menu
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  // update current course when user clicks dropdown item
  const handleCurrentCourse = (course) => {
    searchParams.set("courseId", course.id);
    setSearchParams(searchParams);
  };

  // update current assessment when user clicks dropdown item
  const handleCurrentAssessment = (assessment) => {
    searchParams.set("assessmentId", assessment.id);
    setSearchParams(searchParams);
  };

  console.log("courses is:", courses);
  console.log("currentCourse is:", currentCourse)
  console.log("currentAssessment is:", currentAssessment)

  return (
    <>
      <h1>Assessment Report Screen</h1>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
      <br />
      {currentCourse && (
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {currentAssessment ? `${currentAssessment.title}` : "Assessment"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {courses &&
              courses.id === courseId &&
              courses.assessments.map((assessment) => {
                return (
                  <Dropdown.Item
                    key={assessment.id}
                    onClick={() => handleCurrentAssessment(assessment)}
                  >
                    {assessment.title}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <br />
      <h2>{currentAssessment ? currentAssessment.title : "No Assessment Selected"}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Students</th>
            <th>Sample Question 1</th>
            <th>Sample Question 2</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
      <h3>Overall Class Average: 89%</h3>
    </>
  );
};

export default AssessmentReportScreen;
