import React, { useState, useEffect } from "react";

// Bootstrap
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllQuestions,
  createSubmission,
} from "../store/slices/studentViewSlice";

// Router
import { useParams } from "react-router-dom";

export default function StudentViewScreen() {
  const dispatch = useDispatch();
  const { assessmentId, courseId } = useParams();
  const {
    isLoadingForFetchAssessmentAndQuestions,
    assessment,
    questions,
    errorForFetchQuestions,
  } = useSelector((state) => state.studentView);
  useEffect(() => {
    dispatch(fetchAllQuestions({ assessmentId }));
  }, []);

  // handle dynamic number of input field value
  const [studentId, setStudentId] = useState(0);
  const [submission, setSubmission] = useState({});
  useEffect(() => {
    if (questions) {
      const initialSubmission = submission;
      questions.forEach((question) => {
        initialSubmission[question.id] = "";
      });
      setSubmission(initialSubmission);
    }
  }, [questions]);

  // update submission for the question
  const handleAnwserChange = (questionId, value) => {
    setSubmission((prev) => {
      return { ...prev, [questionId]: value };
    });
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    dispatch(
      createSubmission({
        courseId: Number(courseId),
        assessmentId: Number(assessmentId),
        studentId: Number(studentId),
        submission,
      })
    );
  };

  if (isLoadingForFetchAssessmentAndQuestions) {
    return <Spinner />;
  }

  if (!isLoadingForFetchAssessmentAndQuestions && errorForFetchQuestions) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oops</Alert.Heading>
        <p>{errorForFetchQuestions}</p>
        <p>Please check if the assessment Id in URL is correct.</p>
      </Alert>
    );
  }

  const renderListOfQuestion =
    questions &&
    questions.length &&
    questions.map((question, idx) => {
      return (
        <Card key={idx}>
          <Card.Body>
            <Card.Title>
              {idx + 1}. Question:
              <p>{question.questionText}</p>
            </Card.Title>

            <Form.Control
              as="textarea"
              value={submission[question.id]}
              rows={3}
              placeholder="Answer"
              onChange={(event) =>
                handleAnwserChange(question.id, event.target.value)
              }
            />
          </Card.Body>
        </Card>
      );
    });

  return (
    <div>
      <h1>Assessment </h1>
      <hr />
      <Stack direction="horizontal">
        <h2> Title: {assessment && assessment.title}</h2>
        <FloatingLabel label="* Required Student ID" className="ms-auto">
          <Form.Control
            type="text"
            placeholder="verify id"
            value={studentId || ""}
            onChange={(e) => setStudentId(Number(e.target.value))}
          />
        </FloatingLabel>
      </Stack>
      <hr />
      <Form onSubmit={handleSubmission}>
        {renderListOfQuestion}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
