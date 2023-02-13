// react imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCourse } from "../store/slices/courseSlices";

// bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CourseCreate = ({ setShow, show }) => {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [validated, setValidated] = useState(false);

  const handleCreateSubmit = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      setValidated(true);
      e.stopPropagation();
    } else {
      dispatch(createCourse({ name, subject, gradeLevel }));
      e.preventDefault();
      setShow(false);
      setValidated(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleCreateSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Course Name"
              autoFocus
              onChange={(e) => {
                return setName(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Course Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Subject Name"
              onChange={(e) => setSubject(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Subject Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="100"
              step="1"
              required
              placeholder="Grade"
              onChange={(e) => setGradeLevel(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a number between 0 to 100.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="orangeButton"
            style={{ marginTop: "20px" }}
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourseCreate;
