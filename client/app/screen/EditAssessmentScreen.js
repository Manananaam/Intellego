import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssessment, selectAssessment } from "../store/slices/singleAssessmentSlice";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditAssessmentScreen = () => {
  const assessment = useSelector(selectAssessment).assessment.data;
  const dispatch = useDispatch();
  const { assessmentId } = useParams();

  useEffect(() => {
    dispatch(fetchAssessment(assessmentId));
  }, [dispatch])

  console.log("assessment is:", assessment)

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
            <Form.Group>
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
