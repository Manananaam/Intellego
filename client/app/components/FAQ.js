//react
import React from "react";

//styling
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../components/style/layout.css";

const FAQ = () => {
  return (
    <Container>
      <Row>
        <h1>Intellego FAQs</h1>
        <Col>
          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Header>FAQ #1</Card.Header>
            <Card.Body>
              <Card.Title>What is Intellego?</Card.Title>
              <Card.Text>
                Intellego a dashboard for teachers to create and administer casual formative assessments during class time, and track and review data on student performance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="success" style={{ width: "18rem" }}>
            <Card.Header>FAQ #2</Card.Header>
            <Card.Body>
              <Card.Title>Who is Intellego for?</Card.Title>
              <Card.Text>
                Intellego is a tool for teachers who want a low-stakes place to gather information about student learning and track student performance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="info" style={{ width: "18rem" }}>
            <Card.Header>FAQ #3</Card.Header>
            <Card.Body>
              <Card.Title>What is the best approach for using Intellego?</Card.Title>
              <Card.Text>
                First, sign up for an account. For a way to jump right in and start adding your information to the site, click one of the quick-add buttons on the home screen to add a student, add a class, or add an assessment. Otherwise, select an item on the sidebar to navigate to either courses, assessments or reports.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card border="info" style={{ width: "18rem" }}>
            <Card.Header>FAQ #4</Card.Header>
            <Card.Body>
              <Card.Title>How do I navigate Intellego?</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;
