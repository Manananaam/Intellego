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

//atm courseId, userId not associated with this assessment
//how to get the questions into the questions array of assessment?
//questionCreate says fulfilled: payload: {data: {newQuestion: {assessmentId: null, createdAt: blah, id: 1, questionText: "what I wrote", updatedAt: blah}} }

const courses = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
];

const CreateAssessmentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [associatedCourse, setAssociatedCourse] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { allcourses } = useSelector((state) => state.studentEnroll);

  // fetch a list of course belongs to the logged in user to let user assign assessment to course.
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleFormSubmit = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      dispatch(createAssessment({
        title,
        questionText,
        courseId: associatedCourse ? Number(associatedCourse) : null,
      }));
      e.preventDefault();
      setShowButton(true);
    }
    setValidated(true);
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>New Assessment</Navbar.Brand>
        </Container>
      </Navbar>

      <Form noValidate validated={validated} onSubmit={handleFormSubmit} >
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
        <Form.Group>
          <Form.Control
            required
            as="textarea"
            type="text"
            rows={6}
            placeholder="Your Question Here"
            onChange={(e) => setQuestionText(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
              Please enter a Question.
            </Form.Control.Feedback>
        </Form.Group>
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
        <Button
          as="input"
          type="submit"
          value="Create Assessment"
        ></Button>
      </Form>
      <br />
      {showButton ? (
        <Button onClick={() => navigate("/assessments")}>Back to Assessments</Button>
      ) : null}
    </>
  );
};

export default CreateAssessmentScreen;
