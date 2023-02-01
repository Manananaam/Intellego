import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAssessment } from "../store/slices/assessmentsTableSlice";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//atm courseId, userId not associated with this assessment
//how to get the questions into the questions array of assessment?
//questionCreate says fulfilled: payload: {data: {newQuestion: {assessmentId: null, createdAt: blah, id: 1, questionText: "what I wrote", updatedAt: blah}} }

const CreateAssessmentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAssessment({ title, questionText }));
    navigate("/assessments");
  }

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>New Assessment</Navbar.Brand>
        </Container>
      </Navbar>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" type="text" placeholder="Your Title Here" onChange={(e) => setTitle(e.target.value)}></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control as="textarea" rows={6} placeholder="Your Question Here" onChange={(e) => setQuestionText(e.target.value)}></Form.Control>
        </Form.Group>
        <br />
        <Button as="input" type="submit" value="Create Assessment" onClick={handleSubmit}></Button>
      </Form>
    </>
  );
};

export default CreateAssessmentScreen;
