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

// import Router
import { Link } from "react-router-dom";

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
            src="/assets/animal_avatar_01.png"
          />
        </Figure>

        <Figure.Caption>
          <p className="dashboard_name">
            {user.firstName} {user.lastName}
          </p>
        </Figure.Caption>

        <Nav.Item>
          <Nav.Link as={Link} to="/" eventKey="home">
            Home
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="classes" as={Link} to="/courses">
            Courses
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="assessments" as={Link} to="/assessments">
            Assessments
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <NavDropdown title="Reports" align="end">
            <NavDropdown.Item
              eventKey="reportCourses"
              as={Link}
              to="/report/courses"
            >
              Courses
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="reportStudents"
              as={Link}
              to="/report/students"
            >
              Students
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="reportAssessments"
              as={Link}
              to="/report/assessments"
            >
              Assessments
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/faq">
            FAQ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="logout"
            as={Link}
            to="/"
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
