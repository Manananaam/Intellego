//react stuff
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editCourse } from "../store/slices/courseSlices";

//bootstrap stuff
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CourseCreate = ({ showEdit, setShowEdit, id }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editCourse({ id, name, subject, gradeLevel }));
    setShowEdit(false);
    console.log(showEdit, setShowEdit, id);
  };

  const handleEditClose = () => setShowEdit(false);

  return (
    <>
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class</Modal.Title>
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
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseCreate;
