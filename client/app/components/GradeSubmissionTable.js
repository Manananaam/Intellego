//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
//bootstrap
import { Table } from "react-bootstrap";
//slice methods
import {
  selectAssessment,
  fetchAssessment,
} from "../store/slices/singleAssessmentSlice";
import { selectCourses } from "../store/slices/courseSlices";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~
const GradeSubmissionTable = () => {
  const { assessment } = useSelector(selectAssessment);
  const selectedCourse = useSelector(selectCourses);
  console.log(
    `howdy from table component, here is selected course`,
    selectedCourse
  );
  console.log(`howdy from table component, here is assessment`, assessment);

  const questionHeaders = assessment.questions.map((question, idx) => {
    return <th key={question.id}>Question {idx + 1}</th>;
  });
  // const studentRows =
  // selectedCourse.students && selectedCourse.students ? (
  //   selectedCourse.students.map((student) => {
  //     return (
  //       <tr key={student.id}>
  //         <td>{student.name}</td>
  //       </tr>
  //     );
  //   })
  // ) : (
  //   <tr>
  //     <td>no students to display</td>
  //   </tr>
  // );
  if()
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Student</th>
          {questionHeaders}
        </tr>
      </thead>
      <tbody>
        {selectedCourse.students && selectedCourse.students ? (
          selectedCourse.students.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.name}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>no students to display</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
export default GradeSubmissionTable;
