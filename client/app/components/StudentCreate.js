import React, { useState, useEffect } from "react";

// bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// Router
import { useParams } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { addNewStudent } from "../store/slices/courseSlices";

export default function StudentCreate({ show, setShow }) {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const handleClose = () => setShow(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
  });
  const [validated, setValidated] = useState(false);

  const handleValuesChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewStudent = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    dispatch(addNewStudent({ ...values, courseId }));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddNewStudent} noValidate validated={validated}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              required
              name="firstName"
              placeholder="First Name"
              autoFocus
              onChange={handleValuesChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter student's first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              required
              name="lastName"
              placeholder="Last Name"
              onChange={handleValuesChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter student's Last name.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add new student
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
