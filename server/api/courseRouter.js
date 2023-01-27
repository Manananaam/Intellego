const router = require("express").Router();
const {
  models: { Student, Course },
} = require("../db");
const asyncHandler = require("express-async-handler");
// const AppError = require("../utils/appError");

// get all course list
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(await Course.findAll());
  })
);

// get all courses with students (eager loading)
router.get(
  "/students",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(
      await Course.findAll({
        include: {
          model: Student,
        },
      })
    );
  })
);

// get courses with single students
router.get(
  "/students/:studentId",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(
      await Course.findByPk(req.params.studentId, {
        include: Student,
      })
    );
  })
);

// create new courses
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(200).send(await Course.create(req.body));
  })
);

// Edit a course
router.put(
  "/:courseId",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId);
    res.status(200).send(await course.update(req.body));
  })
);

module.exports = router;
