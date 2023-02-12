import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Toast, ToastContainer, Modal } from "react-bootstrap";
import { useFormik, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthState,
  signup,
  clearAttempt,
} from "../store/slices/authSlice";

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
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user]);
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
            Welcome Back! {`${user?.firstName} ${user?.lastName}`}
          </Toast.Header>
        </Toast>
      </ToastContainer>
      <h1>Sign up for Intellego!</h1>
      <Formik
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
      </Formik>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={visible}
        onHide={handleCloseModal}
      >
        <Modal.Title> Sign Up Error</Modal.Title>
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
