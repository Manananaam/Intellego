import React, { useEffect, useState } from "react";

//Router
import { useSearchParams } from "react-router-dom";

//Bootstrap
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

//redux
import { getCourses } from "../store";
import { useDispatch, useSelector } from "react-redux";

const AssessmentReportScreen = () => {
  const dispatch = useDispatch();

  // use router hook to fetch current courseId
  let [searchParams, setSearchParams] = useSearchParams();

  const [courseId] = [
    Number(searchParams.get("courseId")),
  ];

  // initial current course ans current student
  const [currentCourse, setCurrentCourse] = useState(null);

  // redux state
  // fetch a list of courses managed by current user
  const { allcourses } = useSelector((state) => state.studentEnroll);

  // fetch a list of courses to display at course dropdown menu
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  // update current course when user clicks dropdown item
  const handleCurrentCourse = (course) => {
    searchParams.set("courseId", course.id);
    setSearchParams(searchParams);
  };

  return (
    <>
      <h1>Assessment Report Screen</h1>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Choose Course
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allcourses && allcourses.length && allcourses.map((course) => {
            return (
              <Dropdown.Item key={course.id} onClick={() => handleCurrentCourse(course)}>{course.name}</Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Choose Assessment
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Sample Assessment</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <h2>Assessment Title</h2>
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
