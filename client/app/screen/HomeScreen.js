import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../store/slices/authSlice";

const HomeScreen = () => {
  const { isLoading, user } = useSelector(selectAuthState);
  if (user) {
    return (
      <>
        <p>
          hello, {user.firstName} {user.lastName}!
        </p>
      </>
    );
  }
  return (
    <>
      <p>hello! welcome to intellego!</p>
      <p>
        <Link to={"/login"}>log in here</Link>
      </p>
      <p>
        <Link to={"/signup"}>sign up here</Link>
      </p>
    </>
  );
};
export default HomeScreen;
