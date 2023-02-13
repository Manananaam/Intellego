//react
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, logout } from "../store/slices/authSlice";

//stying
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const HomeScreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isLoading, user } = useSelector(selectAuthState);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container className="landingContainer">
      <Row>
        <Col className="left_slide">
          <h3>
            <img src="/assets/Logo.png" alt="logo" style={{ width: "30px" }} />{" "}
            Welcome to Intellego
          </h3>
          <br />
          <p>
            The dashboard for teachers who want more from their grading
            platform. Intellego offers teachers the tools to create, send and
            grade formative student assessments.
          </p>
          <br />
          <Button
            as={Link}
            to={"login"}
            className="orangeButton"
            style={{ width: "70%" }}
          >
            Log in
          </Button>

          <Button
            as={Link}
            to={"signup"}
            className="orangeButton"
            style={{ width: "70%", marginTop: "20px" }}
          >
            Sign up
          </Button>
        </Col>
        <Col className="right_slide">
          <img src={"/assets/landing_test_image.png"} alt="landing page" />
        </Col>
        <Outlet />
      </Row>
    </Container>
  );
};
export default HomeScreen;
