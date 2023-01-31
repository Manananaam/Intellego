import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editCourse } from "../store/slices/courseSlices";
import { useParams, Link } from "react-router-dom";

const CourseCreate = ({
  setShowEdit,
  showEdit,
  setname,
  setsubject,
  setgradelevel,
}) => {
  const handleClose = () => setShowEdit(false);
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editCourse({ courseId, name, subject, gradeLevel }));
    setShowEdit(false);
  };

  return (
    <>
      <Modal show={showEdit} onHide={handleClose}>
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
                ref={setname}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject Name"
                ref={setsubject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Grade"
                ref={setgradelevel}
                onChange={(e) => setGradeLevel(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
