const AppError = require("../utils/appError");

// @desc 404 Not Found error message
// @route -
// @access -
const notFound = (req, res, next) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

// @desc Global Error handler
// @route -
// @access -
const glbalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  notFound,
  glbalErrorHandler,
};
