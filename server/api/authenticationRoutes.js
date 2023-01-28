const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { User },
} = require("../db");

//@desc: middleware that checks user authentication for protected routes and, if the user is logged in and validated, adds the user info to the req
const protect = asyncHandler(async (req, res, next) => {
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
  if (currentUser.tokenPrecedesPWChange(decodeUser.iat)) {
    const error = new Error(
      "Password changed recently - please log out and log back in."
    );
    error.status = 401;
    throw error;
  }
  //after all this, we have confirmed that the user is valid. we add the user information to the request info and move along to whatever route is next!
  req.user = currentUser;
  next();
});

//three main routes to think about:
//router.get('/me')

//@desc: create new user
router.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    //1. make sure all required fields are present
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      const error = new Error("You are missing a required field.");
      error.status = 400;
      throw error;
    }
    //2. check that the email address is not already in use
    const emailAlreadyInUse = await User.findOne({
      where: { email },
    });
    if (emailAlreadyInUse) {
      const error = new Error(
        "There is already an account associated with this email address"
      );
      error.status = 401;
      throw error;
    }
    //3. create new user in db
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    //4. create JWT
    const token = newUser.generateToken();

    //5. send token to client
    res.status(201).json({
      status: "success",
      token,
      user: newUser.excludePasswordField(),
    });
  })
);

//@desc: existing user login
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    //1. make sure email and password were both provided
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Please enter an email address and password");
      error.status = 400;
      throw error;
    }
    //2. check email and password against database
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      const error = new Error("User does not exist in our database");
      error.status = 401;
      throw error;
    }
    if (!(await user.checkPassword(password))) {
      const error = new Error("Password is incorrect.");
      error.status = 401;
      throw error;
    }
    //3. return token and user info
    const token = user.generateToken();
    res.status(200).json({ token, user: user.excludePasswordField() });
  })
);

module.exports = router;
