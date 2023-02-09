import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, login } from "../store/slices/authSlice";

//NOTE! ADD IN CASE FOR UNDEFINED JWT OR THROWS ERROR

const LogInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector(selectAuthState);

  const validate = yup.object().shape({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Please enter a password that is 6 characters or more")
      .required("Password is required"),
  });

  return (
    <>
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validate}
        onSubmit={(values) => {
          dispatch(login(values));
          navigate("/");
        }}
      >
        {({ errors, touched }) => (
          <Form>
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
export default LogInScreen;
