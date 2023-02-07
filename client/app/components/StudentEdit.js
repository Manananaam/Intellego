//react stuff
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editStudent, removeStudent } from "../store/slices/studentEnrollSlice";

//bootstrap stuff
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const StudentEdit = ({ showEdit, setShowEdit, id }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editStudent({ id, firstName, lastName }));
    setShowEdit(false);
    console.log(showEdit, setShowEdit, id);
  };

  const handleEditClose = () => setShowEdit(false);

  return (
    <>
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>Remove Student</Form.Label>
              <Form.Control
                type="text"
                placeholder="Remove"
                onChange={(e) => removeStudent(e.target.value)}
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
