import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import AssessmentsTable from "../components/AssessmentsTable";
import Sidebar from "../components/Sidebar";

const AssessmentsScreen = () => {
  return (
    <>
      {/*Amy's added Sidebar code*/}
      <Container>
        <Row>
          <Col xs={3} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={9} id="page-content-wrapper">
            <h1>Assessments</h1>
            <Link to="/assessments/create">
              <Button variant="primary">Create Assessment +</Button>
            </Link>
            <AssessmentsTable />
          </Col>
        </Row>
      </Container>

      {/* Natalie's Original Code:

       <Navbar bg="light">
        <Container>
          <Navbar.Brand>Assessments</Navbar.Brand>
        </Container>
      </Navbar>
      <NavLink to="/assessments/create">
        <Button variant="primary" size="lg">
          Create Assessment +
        </Button>
      </NavLink>
      <AssessmentsTable />
      */}
    </>
  );
};

export default AssessmentsScreen;
