import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, logout } from "../store/slices/authSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(selectAuthState);
  const handleLogout = () => {
    dispatch(logout());
  };
  if (user) {
    return (
      <>
        <p>
          hello, {user.firstName} {user.lastName}!
        </p>
        <button onClick={handleLogout}>log out</button>
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
