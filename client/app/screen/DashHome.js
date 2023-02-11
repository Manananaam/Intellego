//react
import React from "react";

//styling
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../components/style/layout.css";
import { Nav } from "react-bootstrap";

const DashHome = () => {
  return (
    <>
      <Container>
        <Row>
          <h1>Quick Actions</h1>
          <Col xs={6} md={4}>
            <Card id="studentCard_dash">
              <Card.Body>
                <Card.Title>Add Student</Card.Title>
                <Card.Text id="cardText">+</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
            <Card id="courseCard_dash">
              <Card.Body>
                <Card.Title>Add Course</Card.Title>
                <Card.Text id="cardText">+</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
            <Card id="assessmentCard_dash">
              <Card.Body>
                <Card.Title>Add Assessment</Card.Title>
                <Card.Text id="cardText">+</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Card>
        <Card.Footer>
          Welcome to Intellego, the dashboard for teachers who want more from
          their grading platform. Intellego offers teachers the tools to create,
          send and grade formative student assessments. For help getting
          started, visit our <a href="/faq">FAQ.</a>
        </Card.Footer>
      </Card>
    </>
  );
};

export default DashHome;
