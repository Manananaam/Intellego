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

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(createCourse({ name, subject, gradeLevel }));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Class Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject Name"
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              placeholder="Grade"
              onChange={(e) => setGradeLevel(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleCreateSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseCreate;
