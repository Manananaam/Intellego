//react
import React from "react";
import { Link } from "react-router-dom";
//styling
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../components/style/layout.css";
import CourseCreate from "../components/CourseCreate";

const DashHome = () => {
  return (
    <Container>
      <Row>
        <h1>Quick Actions</h1>
        {/* <Col xs={6} md={4}>
          <Card id="studentCard_dash">
            <Card.Body>
              <Card.Title>Add Student</Card.Title>
              <Card.Text id="cardText">+</Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
        <Col xs={9} md={6}>
          <Card id="courseCard_dash">
            <Card.Body>
              <Card.Title>Add Course</Card.Title>
              <Card.Text id="cardText">+</Card.Text>
              <Link to="/courses">
                <CourseCreate />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9} md={6}>
          <Card id="assessmentCard_dash">
            <Card.Body>
              <Card.Title>Add Assessment</Card.Title>
              <Card.Text id="cardText">+</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashHome;
