const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { Template },
} = require("../db");

// @desc: Test route controller
// @route: /api/template/test
// @access: public
const testTemplate = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Hello from template route controller",
    },
  });
};

// @desc: Test Error handler
// @route: /api/template/error
// @access: public
const testError = (req, res, next) => {
  // create AppError object
  // AppError(errMsg, statusCode)
  throw new AppError("test for template error handler", 400);
};

// @desc: Example of using asyncHandler to replace try/catch block to catch error
// @route: /api/template/db
// @access: public
const fetchTemplateData = asyncHandler(async (req, res, next) => {
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
});

module.exports = { testTemplate, testError, fetchTemplateData };
