import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink, Link } from "react-router-dom";
import AssessmentsTable from "../components/AssessmentsTable";
import Navbar from "react-bootstrap/Navbar";

const AssessmentsScreen = () => {
  return (
    <>
      <h1>Assessments</h1>
      <Button as={Link} to="/assessments/create" className="orangeButton">
        Create Assessment +
      </Button>
      <AssessmentsTable />
    </>
  );
};

export default AssessmentsScreen;
