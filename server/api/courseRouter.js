const router = require("express").Router();
const {
  models: { Student, Course, Assessment },
} = require("../db");
const asyncHandler = require("express-async-handler");

/*
courses/:courseid/assessments
courses/:courseid/students
courses/:courseid/assessments/:assessmentid
courses/:courseid/students/:studentid
*/

// get all course list
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(await Course.findAll());
  })
);

// coursed assessments
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

// get all courses with students
router.get(
  "/:courseid/students",
  asyncHandler(async (req, res, next) => {
    res.status(200).json(
      await Course.findAll({
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

// get courses with single students
// router.get(
//   "/students/:studentId",
//   asyncHandler(async (req, res, next) => {
//     res.status(200).json(
//       await Course.findByPk(req.params.studentId, {
//         include: Student,
//       })
//     );
//   })
// );

module.exports = router;
