import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Toast,
  ToastContainer,
  Modal,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useFormik, Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthState,
  signup,
  clearAttempt,
} from "../store/slices/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // state related to verify student ID
  const [showToast, setShowToast] = useState(false);
  const { isLoading, user, error } = useSelector(selectAuthState);
  const [visible, setVisible] = useState(false);
  const mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/;

  function validateEmail(message) {
    return this.matches(mailformat, {
      message,
      name: "email",
      excludeEmptyString: true,
    });
  }
  Yup.addMethod(Yup.string, "validateEmail", validateEmail);

  const SignupValidate = Yup.object().shape({
    email: Yup.string("Enter your email")
      .validateEmail("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(6, "Please enter a password that is 6 characters or more")
      .required("Password is required"),
    firstName: Yup.string("Enter your first name").required(
      "First name is a required field"
    ),
    lastName: Yup.string("Enter your last name").required(
      "Last name is a required field"
    ),
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

  useEffect(() => {
    if (error) {
      setVisible(true);
      dispatch(clearAttempt());
    }
  }, [error]);

  function handleCloseModal() {
    dispatch(clearAttempt());
    setVisible(false);
  }
  return (
    <>
      <ToastContainer position='top-center'>
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

      {/* <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={SignupValidate}
        onSubmit={(values) => {
          dispatch(signup(values));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <>
              <label htmlFor='firstName'>First Name</label>
              <Field name='firstName' />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </>
            <br />
            <>
              <label htmlFor='lastName'>Last Name</label>
              <Field name='lastName' />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
            </>
            <br />
            <>
              <label htmlFor='email'>Email Address</label>
              <Field name='email' type='email' />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </>
            <br />
            <>
              <label htmlFor='password'>Password</label>
              <Field name='password' type='password' />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik> */}
      <Container id='loginContainer'>
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
              <Form noValidate onSubmit={handleSubmit} id='signupForm'>
                <Form.Group as={Row} style={{ marginBottom: "20px" }}>
                  <Form.Label column sm={4}>
                    First Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name='firstName'
                      placeholder='First Name'
                      type='text'
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={errors.firstName && touched.firstName}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginBottom: "20px" }}>
                  <Form.Label column sm={4}>
                    Last Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name='lastName'
                      placeholder='Last Name'
                      type='text'
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={errors.lastName && touched.lastName}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginBottom: "20px" }}>
                  <Form.Label column sm={4}>
                    Email
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name='email'
                      type='email'
                      placeholder='Email'
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={errors.email && touched.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.email}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginBottom: "20px" }}>
                  <Form.Label column sm={4}>
                    Password
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name='password'
                      type='password'
                      placeholder='6 or more characters'
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={errors.password && touched.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.password}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group>
                  <Form.Label> </Form.Label>
                  <Button
                    type='submit'
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    Sign Up
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Row>
        <Row>
          <p style={{ fontSize: "10px", marginTop: "20px" }}>
            Already have an account?{" "}
            <Link to='/login'>Login to your account.</Link>
          </p>
        </Row>
      </Container>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={visible}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          <Modal.Title> Sign Up Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There was an issue signing up. Please make sure you have entered a
          valid email and try again. If you already have an account with us, you
          can log in <Link to={"/login"}>here</Link>.
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpScreen;
/*




  return (
    <>

    </>
  );
};

export default SignUpScreen;
*/
