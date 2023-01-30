const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { User },
} = require("../db");

//@desc: middleware that checks user authentication for protected routes and, if the user is logged in and validated, adds the user info to the req
const protectedRoute = asyncHandler(async (req, res, next) => {
  //check the request header for the token
  //if bearer token is present in header, store it as a variable (remove 'bearer' from start)
  //if request header does not contain token, throw error
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    const error = new Error("Access denied - please log in!");
    error.status = 401;
    throw error;
  }
  //validate that token matches the logged in user and that the user still exists in the database
  //note: User.checkToken will automatically throw an error if the token isn't verified

  const decodedUser = await User.checkToken(token);
  const currentUser = await User.findByPk(decodedUser.id);
  if (!currentUser) {
    const error = new Error("This user no longer exists");
    error.status = 401;
    throw error;
  }

  //use tokenPrecedesPWChange method to make sure the user hasn't changed their password since this token was generated
  if (currentUser.tokenPrecedesPWChange(decodedUser.iat)) {
    const error = new Error(
      "Password changed recently - please log out and log back in."
    );
    error.status = 401;
    throw error;
  }
  //after all this, we have confirmed that the user is valid. we add the user information to the request info and move along to whatever route is next!
  req.user = currentUser.excludePasswordField();
  next();
});

module.exports = protectedRoute;
