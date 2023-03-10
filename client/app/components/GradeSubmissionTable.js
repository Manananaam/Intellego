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
  const { assessmentId } = useParams();
  const { assessment, studentSubmissions, currentSubmission } =
    useSelector(selectAssessment);
  const selectedCourse = useSelector(selectCourses);
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = (subId) => {
    dispatch(fetchSingleSubmission(subId));
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    dispatch(fetchAssessment(assessmentId));
    setModalVisible(false);
  };

  if (selectedCourse.length) {
    return <></>;
  }

  if (!studentSubmissions.length) {
    return (
      <>
        <br />
        <h6>There are no student submissions for this assessment yet. </h6>
      </>
    );
  }

  const questionHeaders = [...assessment.questions]
    .sort((a, b) => a.id - b.id)
    .map((question, idx) => {
      return <th key={question.id}>Question {idx + 1}</th>;
    });

  const studentRows =
    studentSubmissions && studentSubmissions.length
      ? [...studentSubmissions]
          .sort((a, b) =>
            (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName)
          )
          .map((student, idx) => {
            if (!!student) {
              return (
                <tr key={idx}>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  {student.submissions && student.submissions.length
                    ? [...student.submissions]
                        .sort((a, b) => a.questionId - b.questionId)
                        .map((sub) => {
                          let key = `${student.id}-${sub.questionId}`;
                          if (sub.grade === null) {
                            return (
                              <td key={sub.id}>
                                Enter Grade
                                <PlusCircleFill
                                  onClick={() => handleClick(sub.id)}
                                  style={{ marginLeft: "10px" }}
                                />
                              </td>
                            );
                          }
                          return (
                            <td key={key}>
                              {sub.grade}%{" "}
                              <Pencil onClick={() => handleClick(sub.id)} />
                            </td>
                          );
                        })
                    : null}
                </tr>
              );
            }
          })
      : null;

  return (
    <>
      <Table bordered>
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
