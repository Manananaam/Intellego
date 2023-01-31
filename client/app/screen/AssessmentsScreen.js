import React from "react";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AssessmentsTable from "../components/AssessmentsTable";

const AssessmentsScreen = () => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Assessments</Navbar.Brand>
        </Container>
      </Navbar>
      <Button variant="primary" size="lg">
        Create Assessment +
      </Button>
      <AssessmentsTable />
    </>
  );
};

export default AssessmentsScreen;
