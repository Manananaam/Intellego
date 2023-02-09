//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//boostrap
import { Modal, Container, Row, Form, Button } from "react-bootstrap";

//slice methods
import {
  selectAssessment,
  submitGrade,
  fetchAssessment,
  fetchStudentSubmissions,
} from "../store/slices/singleAssessmentSlice";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~

const SubmissionModal = (props) => {
  const dispatch = useDispatch();
  const { visible, handleCloseModal } = props;
  const { currentSubmission, studentSubmissions } =
    useSelector(selectAssessment);
  const { assessmentId } = useParams();
  const [subGrade, setSubGrade] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitGrade({ subId: currentSubmission.id, grade: subGrade }));
    dispatch(
      fetchStudentSubmissions({
        assessmentId: assessmentId,
        courseId: currentSubmission.courseId,
      })
    );
    handleCloseModal();
    setSubGrade(null);
  };

  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={visible}
      onHide={handleCloseModal}
    >
      <Modal.Title>
        {currentSubmission && Object.keys(currentSubmission).length
          ? currentSubmission.question.questionText
          : ""}
      </Modal.Title>
      <Modal.Body>
        <Container>
          <Row>
            {currentSubmission && Object.keys(currentSubmission).length
              ? currentSubmission.response
              : ""}
          </Row>
        </Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type='number'
              min='1'
              // value={subGrade}
              max='100'
              step='1'
              onChange={(e) => setSubGrade(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default SubmissionModal;
