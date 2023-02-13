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
    dispatch(
      submitGrade({
        subId: currentSubmission.id,
        grade: subGrade,
        assessmentId,
        courseId: currentSubmission.courseId,
      })
    );
    handleCloseModal();
    setSubGrade(null);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={visible}
      onHide={handleCloseModal}
    >
      <Modal.Header>
        <Modal.Title>
          {currentSubmission && Object.keys(currentSubmission).length
            ? currentSubmission.question.questionText
            : ""}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row>
            <h6>Studnet's Answer: </h6>
            <p>
              {currentSubmission && Object.keys(currentSubmission).length
                ? currentSubmission.response
                : ""}
            </p>
          </Row>
        </Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="number"
              min="1"
              // value={subGrade}
              placeholder="Enter Grade"
              max="100"
              step="1"
              onChange={(e) => setSubGrade(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" style={{ marginTop: "10px" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default SubmissionModal;
