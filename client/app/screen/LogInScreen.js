import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useFormik, Formik, Field } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, login } from "../store/slices/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

//NOTE! ADD IN CASE FOR UNDEFINED JWT OR THROWS ERROR

const LogInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getUserInfo, user } = useSelector(selectAuthState);
  console.log(getUserInfo);
  // state related to verify student ID
  const [showToast, setShowToast] = useState(false);

  const validate = yup.object().shape({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Enter 6 or more characters")
      .required("Password is required"),
  });

  useEffect(() => {
    if (user) {
      setShowToast(true);
      navigate("/");
    }
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ToastContainer position="top-center">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <span>Intellego</span>
          </Toast.Header>
          <Toast.Body>
            Welcome Back! {`${user?.firstName} ${user?.lastName}`}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Container id="loginContainer">
        <Row>
          <h4>Login to your account</h4>
        </Row>
        <Row>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validate}
            onSubmit={(values) => dispatch(login(values))}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit} id="loginForm">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={errors.email && touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.password && touched.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Button
                    type="submit"
                    style={{ width: "100%", marginTop: "20px" }}
                    className="orangeButton"
                  >
                    Log in
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Row>
        <Row>
          <p style={{ fontSize: "10px", marginTop: "20px" }}>
            Don't have an account? <Link to="/signup">Sign up for free</Link>
          </p>
        </Row>
      </Container>
    </>
  );
};
export default LogInScreen;
