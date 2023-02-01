const router = require("express").Router();
const {
  models: { Student, Course, Assessment },
} = require("../db");
const asyncHandler = require("express-async-handler");

// GET all course list
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(
      await Course.findAll({
        where: {
          isActive: true,
        },
      })
    );
  })
);

// GET indiviual courses with assessments
router.get(
  "/:courseid/assessments",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(
      await Course.findAll({
        include: Assessment,
      })
    );
  })
);

// GET individual courses with students
router.get(
  "/:courseid/students",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(
      await Course.findByPk(req.params.courseid, {
        include: Student,
      })
    );
  })
);

// POST(create) a courses
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(200).send(await Course.create(req.body));
  })
);

// PUT(update) a course
router.put(
  "/:courseId",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId);
    res.status(200).send(await course.update(req.body));
  })
);

//PUT(update) isActive
router.put(
  "/:courseId",
  asyncHandler(async (req, res, next) => {
    const courseActive = await Course.findByPk(req.params.courseId);
    res.status(200).send(await courseActive.update(req.body.isActive));
  })
);

module.exports = router;
