import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import AssessmentsTable from "../components/AssessmentsTable";
import Navbar from "react-bootstrap/Navbar";

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
