//import react
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Figure from "react-bootstrap/Figure";
import "../components/style/Sidebar.css";
//import bootstrap

const Sidebar = () => {
  return (
    <>
      <Nav
        className="col-md-3 d-none d-md-block bg-light sidebar flex-column justify-content-center"
        defaultActiveKey="/home"
        variant="pills"
      >
        <Figure>
          <Figure.Image
            width={150}
            height={150}
            alt="150x150"
            src="https://via.placeholder.com/150"
          />
        </Figure>

        <Figure.Caption>
          <p>
            ${"FirstName"} ${"LastName"}
          </p>
        </Figure.Caption>

        <Nav.Item>
          <Nav.Link href="/dashboard">Home</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="classes" href="/courses">
            Classes
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="assessments" href="/assessments">
            Assessments
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="reports" href="/reports/course">
            Reports
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="logout" className="dash_logout">
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Sidebar;
