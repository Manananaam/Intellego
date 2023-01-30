import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
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
