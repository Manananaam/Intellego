import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";

const MainDashboardScreen = () => {
  return (
    <Container>
      <Row>
        <Col xs={3} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={9} id="page-content-wrapper">
          Welcome to the teachers dashboard!
        </Col>
      </Row>
    </Container>
  );
};

export default MainDashboardScreen;
