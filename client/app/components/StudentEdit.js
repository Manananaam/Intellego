//react stuff
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editStudent } from "../store/slices/studentViewSlice";
import { removeStudent } from "../store/slices/courseSlices";

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
  };

  const handleEditClose = () => setShowEdit(false);

  const handleRemoveStudent = (e) => {
    e.preventDefault();
    dispatch(removeStudent(id));
    handleEditClose();
  };

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
              <Button onClick={handleRemoveStudent}>Remove Student</Button>
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
