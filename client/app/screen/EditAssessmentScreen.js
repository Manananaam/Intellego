import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAssessment,
  selectAssessment,
  editAssessmentTitle,
  deleteQuestion,
} from "../store/slices/singleAssessmentSlice";
import { Container, Navbar, Form, Button } from "react-bootstrap";

import { ArchiveFill, Archive, Trash3 } from "react-bootstrap-icons";

//right now the question default info shows, but someone has to retype the whole thing out (can't make tiny edits)

const EditAssessmentScreen = () => {
  const assessment = useSelector(selectAssessment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [assessmentTitle, setAssessmentTitle] = useState("");

  // const [questionText, setQuestionText] = useState("");

  useEffect(() => {
    dispatch(fetchAssessment(assessmentId));
    setAssessmentTitle(assessment.assessment.assessmentTitle);
  }, [dispatch, assessment.assessment.assessmentTitle]);
  function handleAddQuestion() {
    console.log("adding question, babe");
  }

  // const handleNewQuestion = (e) => {
  //   e.preventDefault();
  //   dispatch(createQuestion({ questionText }));
  //   setQuestionText("");
  // }

  //attach this to when someone types in the question field... or clicks out of it? Not sure...

  //new handler, as soon as someone types anything into new question field, need to render another new question form item
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editAssessmentTitle({ assessmentId, assessmentTitle }));
    navigate("/assessments");
  }
  //NOTE - still not auto updating listview when you navigate back
  return (
    <>
      <Navbar bg='light'>
        <Container>
          <Navbar.Brand>Edit Assessment</Navbar.Brand>
        </Container>
      </Navbar>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Assessment Title</Form.Label>
          <Form.Control
            size='lg'
            type='text'
            value={assessmentTitle || ""}
            onChange={(e) => setAssessmentTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        {assessment && assessment.assessment.questions.length ? (
          assessment.assessment.questions.map((question) => {
            function handleDeleteQuestion() {
              dispatch(deleteQuestion(question.id));
              console.log("deleting question babe");
              console.log(question.id);
            }
            return (
              <Form.Group key={question.id}>
                <Form.Control
                  as='textarea'
                  rows={6}
                  placeholder={question.questionText}
                ></Form.Control>
                <Trash3 onClick={handleDeleteQuestion} />
              </Form.Group>
            );
          })
        ) : (
          <></>
        )}
        <Form.Group>
          <Form.Control
            as='textarea'
            rows={6}
            placeholder='Add a Question +'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' value='Submit'>
          Submit
        </Button>
        <Button type='button' onClick={handleAddQuestion}>
          Add Question
        </Button>
      </Form>
    </>
  );
};

export default EditAssessmentScreen;
