import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AssessmentsTable from "../components/AssessmentsTable";
import { NavLink } from "react-router-dom";

const AssessmentsScreen = () => {
  return (
    <>
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
    </>
  );
};

export default AssessmentsScreen;
