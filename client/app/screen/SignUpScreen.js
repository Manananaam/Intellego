import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useFormik, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, signup } from "../store/slices/authSlice";

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector(selectAuthState);

  const SignupValidate = Yup.object().shape({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
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

  return (
    <>
      <h1>Sign up for Intellego!</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={SignupValidate}
        onSubmit={(values) => {
          dispatch(signup(values));
          navigate("/");
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
    </>
  );
};

export default SignUpScreen;
