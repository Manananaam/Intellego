import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAssessment } from "../store/slices/assessmentsTableSlice";
import { getCourses } from "../store";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const CreateAssessmentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [associatedCourse, setAssociatedCourse] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { allcourses } = useSelector((state) => state.studentEnroll);

  // new way to add multiple assessment question
  const [questions, setQuestions] = useState([""]);
  const handleQuestionsValueChange = (event, idx) => {
    setQuestions((prev) => {
      return prev.map((el, index) => {
        if (index === idx) {
          return event.target.value;
        } else {
          return el;
        }
      });
    });
  };
  const handleAddMoreQuestion = () => {
    setValidated(false);
    setQuestions((prev) => [...prev, ""]);
  };

  // fetch a list of course belongs to the logged in user to let user assign assessment to course.
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
    dispatch(
      createAssessment({
        title,
        questions,
        courseId: associatedCourse ? Number(associatedCourse) : null,
      })
    );
    setShowButton(true);
    setValidated(false);
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>New Assessment</Navbar.Brand>
        </Container>
      </Navbar>

      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            size="lg"
            type="text"
            placeholder="Your Title Here"
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a Title.
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        {questions.map((question, idx) => {
          return (
            <Form.Group key={idx}>
              <Form.Control
                required
                value={question}
                as="textarea"
                type="text"
                rows={6}
                placeholder="Your Question Here"
                onChange={(e) => handleQuestionsValueChange(e, idx)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please enter a Question.
              </Form.Control.Feedback>
            </Form.Group>
          );
        })}

        <Button variant="primary" onClick={handleAddMoreQuestion}>
          Add Question +
        </Button>
        <br />
        <FloatingLabel label="Assign to course">
          <Form.Select
            aria-label="associated-course"
            value={associatedCourse || ""}
            disabled={allcourses?.length === 0}
            onChange={(e) => {
              setAssociatedCourse(e.target.value);
            }}
          >
            {allcourses && allcourses.length ? (
              <>
                <option key="blackChoice" hidden value></option>
                {allcourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </>
            ) : (
              <option key="empty-course-prompt" hidden>
                Please create course before assign
              </option>
            )}
          </Form.Select>
        </FloatingLabel>
        <br />
        <Button as="input" type="submit" value="Create Assessment"></Button>
      </Form>
      <br />

      {showButton ? (
        <Button onClick={() => navigate("/assessments")}>
          Back to Assessments
        </Button>
      ) : null}
    </>
  );
};

export default CreateAssessmentScreen;
