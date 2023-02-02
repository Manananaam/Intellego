import React, { useState, useEffect } from "react";

// Bootstrap
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// dummy data
// assessment(108) assign to course Id = 114, 120
// student belong to course(114) : 100
// student belong to course(120): 100,101,102
const course = {
  id: 120,
  name: "Shakespeare II Class",
  subject: "ELA",
  gradeLevel: 8,
  userId: 102,
};

const assessment = {
  id: 108,
  title: "Quiz on Romeo and Juliet",
  userId: 102,
};

const questions = [
  {
    id: 102,
    questionText: "Who is your favorite character in Romeo and Juliet?",
    assessmentId: 108,
  },
  {
    id: 103,
    questionText: "Why do the Montagues and Capulets hate each other?",
    assessmentId: 108,
  },
  {
    id: 104,
    questionText:
      "What is a movie or book that reminds you of Romeo and Juliet? Why?",
    assessmentId: 108,
  },
];

// Structure
/*
  1. Title
  2. Heading: title of assessment, input field for student verify id
  3. a list of question & answer card

*/

export default function StudentViewScreen() {
  /* state format
    {
      questionId: "",
      102:""
    }

  */
  const [studentId, setStudentId] = useState(0);
  const [submission, setSubmission] = useState({});
  useEffect(() => {
    const initialSubmission = submission;
    questions.forEach((question) => {
      initialSubmission[question.id] = "";
    });
    setSubmission(initialSubmission);
  }, []);

  // update submission for the question
  const handleAnwserChange = (questionId, value) => {
    setSubmission((prev) => {
      return { ...prev, [questionId]: value };
    });
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    console.log({
      studentId,
      submission,
    });
  };

  const renderListOfQuestion = questions.map((question, idx) => {
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
        <h2> Title: {assessment.title}</h2>
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
