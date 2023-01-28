const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { Student, Course, Course_Student },
} = require("../db");

// @desc: get individual student's enrollments
// @route: GET /api/students/:studentId
// @access: public
router.get(
  "/:studentId",
  asyncHandler(async (req, res, next) => {
    const students = await Student.findByPk(req.params.studentId, {
      include: [{ model: Course }],
    });
    res.send(students);
  })
);

module.exports = router;
