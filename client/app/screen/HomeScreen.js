//react
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, logout } from "../store/slices/authSlice";

//stying
import Container from "react-bootstrap/Container";

const HomeScreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isLoading, user } = useSelector(selectAuthState);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <p>hello! welcome to intellego!</p>
      <p>
        <Link to={"login"}>log in here</Link>
      </p>
      <p>
        <Link to={"signup"}>sign up here</Link>
      </p>
      <Outlet />
    </>
  );
  // return user ? (
  //   <>
  //     <p>
  //       hello, {user.firstName} {user.lastName}!
  //     </p>
  //     <button onClick={handleLogout}>log out</button>
  //   </>
  // ) : (
  //   <>
  //     <p>hello! welcome to intellego!</p>
  //     <p>
  //       <Link to={"login"}>log in here</Link>
  //     </p>
  //     <p>
  //       <Link to={"signup"}>sign up here</Link>
  //     </p>
  //     <Outlet />
  //   </>
  // );
};
export default HomeScreen;
