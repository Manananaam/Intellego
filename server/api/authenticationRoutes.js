const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { User },
} = require("../db");

//three main routes to think about:
//router.post('/login')
//router.post('/signup')
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

module.exports = router;
