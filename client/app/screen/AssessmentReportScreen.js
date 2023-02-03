import React from "react";
import Table from "react-bootstrap/Table";

const AssessmentReportScreen = () => {
  return (
    <>
      <h1>Assessment Report Screen</h1>
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
