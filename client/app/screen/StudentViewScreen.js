import React, { useState, useEffect } from "react";

// Bootstrap
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllQuestions,
  createSubmission,
  verifyStudentId,
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
    isLoadingForSubmission,
    submissionSuccess,
    errorForSubmission,
    verifyResult,
  } = useSelector((state) => state.studentView);
  useEffect(() => {
    dispatch(fetchAllQuestions({ courseId, assessmentId }));
  }, []);

  // state related to verify student ID
  const [showToast, setShowToast] = useState(false);
  const [studentIdFormHasSubmit, setStudentIdFormHasSubmit] = useState(false);
  //form validation: studentId should be required and it's should be a integer
  const [studentId, setStudentId] = useState("");
  const [studentIdTouch, setStudentIdTouched] = useState(false);
  const studentIdIsValid =
    studentId.trim() !== "" && Number.isInteger(Number(studentId));
  const studentIdInputIsValid = studentIdIsValid && studentIdTouch;
  // handle dynamic number of input field value
  const [submission, setSubmission] = useState({});
  useEffect(() => {
    if (questions) {
      const initialSubmission = submission;
      questions.forEach((question) => {
        initialSubmission[question.id] = "";
      });
      setSubmission(initialSubmission);
      // use this format to load localStorage value.
      setSubmission((prev) => {
        const values = JSON.parse(localStorage.getItem("answer"));
        // only get values in localStorage which is the current question's response
        const currentQuestion = {};
        for (const key of Object.keys(values)) {
          if (questions.find((el) => el.id === Number(key))) {
            currentQuestion[key] = values[key];
          }
        }
        return {
          ...prev,
          ...currentQuestion,
        };
      });
    }
  }, [questions]);

  // update submission for the question
  const handleAnwserChange = (questionId, value) => {
    setSubmission((prev) => {
      const newAnwer = { ...prev, [questionId]: value };
      localStorage.setItem("answer", JSON.stringify(newAnwer));
      return newAnwer;
    });
  };

  useEffect(() => {
    if (studentIdFormHasSubmit) {
      setShowToast(true);
    }
  }, [verifyResult, studentIdFormHasSubmit]);

  const handleStudentIdChange = (event) => {
    setStudentIdFormHasSubmit(false);
    setStudentId(event.target.value);
  };

  const handleStudentVerify = (event) => {
    event.preventDefault();
    setStudentIdFormHasSubmit(true);
    setStudentIdTouched(true);
    setShowToast(true);
    if (studentIdInputIsValid) {
      dispatch(
        verifyStudentId({
          courseId: Number(courseId),
          studentId: Number(studentId),
        })
      );
    } else {
      setShowToast(false);
      setStudentIdFormHasSubmit(false);
    }
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    setStudentIdTouched(true);
    if (!studentIdInputIsValid || !studentIdFormHasSubmit || !verifyResult) {
      return;
    }
    dispatch(
      createSubmission({
        courseId: Number(courseId),
        assessmentId: Number(assessmentId),
        studentId: Number(studentId),
        submission,
      })
    );
  };

  if (isLoadingForFetchAssessmentAndQuestions || isLoadingForSubmission) {
    return <Spinner />;
  }

  if (!isLoadingForFetchAssessmentAndQuestions && errorForFetchQuestions) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oops</Alert.Heading>
        <p>{errorForFetchQuestions}</p>
        <p>Please check if the URL is correct.</p>
      </Alert>
    );
  }

  if (!isLoadingForSubmission && errorForSubmission) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oops</Alert.Heading>
        <p>{errorForSubmission}</p>
      </Alert>
    );
  }

  if (!isLoadingForSubmission && !errorForSubmission && submissionSuccess) {
    return (
      <Alert variant="success">
        You have successfully submitted your answers!
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
            <Card.Title>Question #{idx + 1} :</Card.Title>
            <Card.Text>{question.questionText}</Card.Text>
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
    <Container>
      <ToastContainer position="top-center">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>Verify Result</Toast.Header>
          <Toast.Body>
            {verifyResult
              ? "Congrate, your student ID is valid."
              : "Opps, Your studentId is invalid. Please check your studentID and verify again."}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <h1>Assessment </h1>

      <Row>
        <Col md={8}>
          <h2> Title: {assessment && assessment.title}</h2>
        </Col>

        <Col md={4}>
          <Form className="ms-auto" onSubmit={handleStudentVerify}>
            <Row>
              <Col md={9}>
                <FloatingLabel label="*Student ID">
                  <Form.Control
                    type="text"
                    placeholder="verify id"
                    value={studentId}
                    onBlur={() => setStudentIdTouched(true)}
                    onChange={handleStudentIdChange}
                  />

                  {!studentIdIsValid && studentIdTouch && (
                    <Form.Text className="text-danger">
                      Student Id is required and must be integer
                    </Form.Text>
                  )}
                </FloatingLabel>
              </Col>
              <Col md={3}>
                <Button className="orangeButton" type="submit" size="lg">
                  verify
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Form onSubmit={handleSubmission}>
          {renderListOfQuestion}
          <br />
          <Button className="orangeButton" type="submit">
            Submit Assessment
          </Button>
          {studentIdInputIsValid && !studentIdFormHasSubmit && (
            <p className="text-danger">Please verify Id before submit.</p>
          )}
        </Form>
      </Row>
    </Container>
  );
}
