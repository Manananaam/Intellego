import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <>
      <p>hello! welcome to intellego!</p>
      <p>
        <Link to={"/login"}>
          <p>log in here</p>
        </Link>
      </p>
      <p>
        <Link to={"/signup"}>
          <p>sign up here</p>
        </Link>
      </p>
    </>
  );
};
export default HomeScreen;
