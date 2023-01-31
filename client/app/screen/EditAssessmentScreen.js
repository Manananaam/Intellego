import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssessment, selectAssessment } from "../store/slices/singleAssessmentSlice";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//right now the question default info shows, but someone has to retype the whole thing out (can't make tiny edits)

const EditAssessmentScreen = () => {
  const assessment = useSelector(selectAssessment).assessment.data;
  const dispatch = useDispatch();
  const { assessmentId } = useParams();
  const [questionText, setQuestionText] = useState("");

  useEffect(() => {
    dispatch(fetchAssessment(assessmentId));
  }, [dispatch])

  const handleNewQuestion = (e) => {
    e.preventDefault();
    dispatch(createQuestion({ questionText }));
    setQuestionText("");
  }
//attach this to when someone types in the question field... or clicks out of it? Not sure...

//new handler, as soon as someone types anything into new question field, need to render another new question form item

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Edit Assessment</Navbar.Brand>
        </Container>
      </Navbar>
      <Form>
        <Form.Group>
          <Form.Label>Assessment Title</Form.Label>
          <Form.Control size="lg" type="text" placeholder={assessment ? assessment.assessment.title : "Your Title Here"}></Form.Control>
        </Form.Group>
        <br />
        {assessment && assessment.assessment.questions.length ?
          assessment.assessment.questions.map((question) => (
            <Form.Group key={question.id}>
              <Form.Control as="textarea" rows={6} placeholder={question.questionText}></Form.Control>
            </Form.Group>
          )) : <></>}
        <Form.Group>
          <Form.Control as="textarea" rows={6} placeholder="Add a Question +"></Form.Control>
        </Form.Group>
      </Form>
      <Button as="input" type="submit" value="Submit"></Button>
    </>
  );
};

export default EditAssessmentScreen;
