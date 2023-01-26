const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { Template },
} = require("../db");

const {
  testTemplate,
  testError,
  fetchTemplateData,
} = require("../controllers/templateController");

// @desc: Test route controller
// @route: /api/template/test
// @access: public
router.get("/test", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Hello from template route controller",
    },
  });
});

// @desc: Test Error handler
// @route: /api/template/error
// @access: public
router.get("/error", (req, res, next) => {
  // create AppError object
  // AppError(errMsg, statusCode)
  throw new AppError("test for template error handler", 400);
});

// @desc: Example of using asyncHandler to replace try/catch block to catch error
// @route: /api/template/db
// @access: public
router.get(
  "/db",
  asyncHandler(async (req, res, next) => {
    const template = await Template.findAll();

    // how to throw error in async function
    // throw new AppError("test for template error handler", 400);

    res.status(200).json({
      status: "success",
      results: template?.length,
      data: {
        template,
      },
    });
  })
);

module.exports = router;
