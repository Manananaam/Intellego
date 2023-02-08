//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
//components
import SubmissionModal from "./SubmissionModal";
//bootstrap
import { Table, Button, Modal } from "react-bootstrap";
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
  fetchSingleSubmission,
} from "../store/slices/singleAssessmentSlice";
import { selectCourses } from "../store/slices/courseSlices";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~
const GradeSubmissionTable = () => {
  const dispatch = useDispatch();
  const { assessment, studentSubmissions } = useSelector(selectAssessment);
  const selectedCourse = useSelector(selectCourses);
  const [modalVisible, setModalVisible] = useState(false);

  // console.log(
  //   `howdy from table component, here is selected course`,
  //   selectedCourse
  // );
  // console.log(`howdy from table component, here is assessment`, assessment);
  // console.log(
  //   `howdy from table component, here are student submissions`,
  //   studentSubmissions
  // );
  const handleClick = (subId) => {
    dispatch(fetchSingleSubmission(subId));
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    console.log("closing modal");
    setModalVisible(false);
  };

  if (!studentSubmissions.length) {
    return <h2>There are no student submissions for this assessment yet. </h2>;
  }

  const questionHeaders = assessment.questions.map((question, idx) => {
    return <th key={question.id}>Question {idx + 1}</th>;
  });

  const studentRows = studentSubmissions.map((student, idx) => {
    // console.log("mapping studentRows, here is current student", student);
    return (
      <tr key={idx}>
        <td>
          {student.firstName} {student.lastName}
        </td>
        {student.submissions.map((sub) => {
          let key = `${student.id}-${sub.questionId}`;
          if (sub.grade === null) {
            return (
              <td key={sub.id}>
                Enter Grade
                <PlusCircleFill onClick={() => handleClick(sub.id)} />
              </td>
            );
          }
          return (
            <td key={key}>
              {sub.grade}% <Pencil onClick={() => handleClick(sub.id)} />
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student</th>
            {questionHeaders}
          </tr>
        </thead>
        <tbody>{studentRows}</tbody>
      </Table>
      <SubmissionModal
        visible={modalVisible}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
export default GradeSubmissionTable;

/* notes heading into break
move modal import here instead of main grading screen
add redux state for current submission if it doesn't already exist
differentiate between put and post can be determined on this page? like, the click handler will determine what the submit button is based on whether you clicked pencil or plus
AHA these are ALL put - just editing the grade field !

*/
