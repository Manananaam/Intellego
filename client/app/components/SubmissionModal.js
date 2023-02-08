//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//boostrap
import { Modal, Container, Row, Form } from "react-bootstrap";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~

/*
note - if we want to differentiate on submit whether we're doing post or put, i think
we either need two modal components OR we can pass down the onsubmit function in props?
*/

const SubmissionModal = (props) => {
  const { visible, handleCloseModal } = props;
  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={visible}
      onHide={handleCloseModal}
    >
      {/* NOTE - how to add in show= and onHide=? pass functions in props? */}

      <Modal.Title>Text of Question</Modal.Title>
      <Modal.Body>
        <Container>
          <Row>Student's Response</Row>
        </Container>
        <Form>
          <Form.Group>
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type='number'
              min='1'
              max='100'
              step='1'
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default SubmissionModal;
