//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
//bootstrap
import { Table, Button } from "react-bootstrap";
import {
  ArchiveFill,
  Archive,
  Trash3,
  PlusCircleFill,
  Pencil,
} from "react-bootstrap-icons";
//slice methods
import {
  selectAssessment,
  fetchAssessment,
  fetchStudentSubmissions,
} from "../store/slices/singleAssessmentSlice";
import { selectCourses } from "../store/slices/courseSlices";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~
const GradeSubmissionTable = () => {
  const { assessment, studentSubmissions } = useSelector(selectAssessment);
  const selectedCourse = useSelector(selectCourses);

  console.log(
    `howdy from table component, here is selected course`,
    selectedCourse
  );
  console.log(`howdy from table component, here is assessment`, assessment);
  console.log(
    `howdy from table component, here are student submissions`,
    studentSubmissions
  );
  const handleClick = (key) => {
    console.log("click key", key);
  };

  if (!studentSubmissions.length) {
    return <h2>There are no student submissions for this assessment yet. </h2>;
  }

  const questionHeaders = assessment.questions.map((question, idx) => {
    return <th key={question.id}>Question {idx + 1}</th>;
  });

  const studentRows = studentSubmissions.map((student, idx) => {
    console.log("mapping studentRows, here is current student", student);
    return (
      <tr key={idx}>
        <td>
          {student.firstName} {student.lastName}
        </td>
        {student.submissions.map((sub) => {
          let key = `${student.id}-${sub.questionId}`;
          if (sub.grade === null) {
            return (
              <td key={key}>
                Enter Grade
                <PlusCircleFill onClick={() => handleClick(key)} />
              </td>
            );
          }
          return (
            <td key={key}>
              {sub.grade}% <Pencil onClick={() => handleClick(key)} />
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Student</th>
          {questionHeaders}
        </tr>
      </thead>
      <tbody>{studentRows}</tbody>
    </Table>
  );
};
export default GradeSubmissionTable;
