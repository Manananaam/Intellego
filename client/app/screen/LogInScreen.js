import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, login } from "../store/slices/authSlice";

//NOTE! ADD IN CASE FOR UNDEFINED JWT OR THROWS ERROR
const validate = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Please enter a password that is 6 characters or more")
    .required("Password is required"),
});

const LogInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector(selectAuthState);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(
        "howdy, from formik handlesubmit, here are the values",
        values
      );
      dispatch(login(values));
    },
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email Address</label>
        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};
export default LogInScreen;
