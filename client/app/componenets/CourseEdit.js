import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CourseCreate = ({
  id,
  setShow,
  show,
  handleEditSubmit,
  setname,
  setsubject,
  setgradelevel,
}) => {
  const handleClose = () => setShow(false);

  return (
    <>
      {console.log("test")}
      <Modal show={show} onHide={handleClose}>
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
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject Name"
                ref={setsubject}
                onChange={(e) => setsubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Grade"
                ref={setgradelevel}
                onChange={(e) => setgradelevel(e.target.value)}
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
