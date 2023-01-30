const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { User },
} = require("../db");
const protectedRoute = require("./middleware");

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

// @desc: Get user info for logged in user
router.get(
  "/user",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      status: "success",
      user: req.user.excludePasswordField(),
    });
  })
);

module.exports = router;
console.log(module);
