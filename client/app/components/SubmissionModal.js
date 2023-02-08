//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//boostrap
import { Modal, Container, Row, Form, Button } from "react-bootstrap";

//slice methods
import { selectAssessment } from "../store/slices/singleAssessmentSlice";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~

/*
note - if we want to differentiate on submit whether we're doing post or put, i think
we either need two modal components OR we can pass down the onsubmit function in props?
*/

const SubmissionModal = (props) => {
  const { visible, handleCloseModal } = props;
  const { currentSubmission } = useSelector(selectAssessment);
  const [subGrade, setSubGrade] = useState(null);
  const handleSubmit = (e) => {
    console.log(
      "handle submit: subId and grade",
      currentSubmission.id,
      subGrade
    );
    e.preventDefault();
    handleCloseModal();
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
