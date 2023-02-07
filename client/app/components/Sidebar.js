//import react
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, logout } from "../store/slices/authSlice";

//stylesheet
import "../components/style/Sidebar.css";

//import bootstrap
import Nav from "react-bootstrap/Nav";
import Figure from "react-bootstrap/Figure";
import NavDropdown from "react-bootstrap/NavDropdown";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthState);

  return (
    <>
      <Nav
        className="col-md-3 d-none d-md-block bg-light sidebar justify-content-center"
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
          <p className="dashboard_name">
            {user.firstName} {user.lastName}
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
          <NavDropdown title="Reports" align="end">
            <NavDropdown.Item eventKey="reportCourses" href="/report/courses">
              Classes
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="reportStudents" href="/report/students">
              Students
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="reportAssessments"
              href="/report/assessments"
            >
              Assessments
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="logout"
            href="/"
            onClick={(e) => dispatch(logout())}
          >
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Sidebar;
