import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useFormik, Formik, Field } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, signup } from "../store/slices/authSlice";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // state related to verify student ID
  const [showToast, setShowToast] = useState(false);
  const { isLoading, user } = useSelector(selectAuthState);

  const SignupValidate = yup.object().shape({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Please enter a password that is 6 characters or more")
      .required("Password is required"),
    firstName: yup
      .string("Enter your first name")
      .required("First name is a required field"),
    lastName: yup
      .string("Enter your last name")
      .required("Last name is a required field"),
  });

  useEffect(() => {
    if (user) {
      setShowToast(true);
      navigate("/");
    }
  }, [user]);

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
            Welcome Back! {`${user?.firstName} ${user?.lastName}`}
          </Toast.Header>
        </Toast>
      </ToastContainer>
      <Container id="loginContainer">
        <Row>
          <h1>Create an Account</h1>
        </Row>
        <Row>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupValidate}
            onSubmit={(values) => {
              dispatch(signup(values));
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit} id="loginSignupForm">
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    First Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={errors.firstName && touched.firstName}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Last Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={errors.lastName && touched.lastName}
                    />
                  </Col>

                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Email
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={errors.email && touched.email}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Password
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="6 or more chacacters"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={errors.password && touched.password}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label> </Form.Label>
                  <Button
                    type="submit"
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    Sign Up
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Row>
      </Container>
    </>
  );
};

export default SignUpScreen;
