//react stuff
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editStudent } from "../store/slices/studentViewSlice";
import { removeStudent } from "../store/slices/courseSlices";

//bootstrap stuff
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const StudentEdit = ({ showEdit, setShowEdit, student }) => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    dispatch(editStudent({ id: student.id, firstName, lastName }));
    setShowEdit(false);
  };

  const handleEditClose = () => setShowEdit(false);

  const handleRemoveStudent = (e) => {
    e.preventDefault();
    dispatch(removeStudent(student.id));
    handleEditClose();
  };

  return (
    <>
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit} noValidate validated={validated}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                placeholder="First Name"
                autoFocus
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter student's first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                placeholder="Last Name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter student's Last name.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleRemoveStudent}>Remove Student</Button>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
