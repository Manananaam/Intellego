import React from "react";

//Bootstrap
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

//redux
import { getCourses } from "../store";

const AssessmentReportScreen = () => {
  // redux state
  // fetch a list of courses managed by current user
  const { allcourses } = useSelector((state) => state.studentEnroll);

  return (
    <>
      <h1>Assessment Report Screen</h1>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Choose Course
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Sample Course</Dropdown.Item>
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
