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

// todo: how the page enroll student to course if the student already be created before
// ? students page -> student -> enroll to course
// ? or at course page, enroll student by enter student name
// @desc: enroll existed student to course
// @route: POST /api/students/:studentId/courses/:courseId
// @access: public
router.post(
  "/:studentId/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    //!500 sequelize error: student had enrolled to this course
    const enrollResult = await Course_Student.create({
      courseId: req.params.courseId,
      studentId: req.params.studentId,
    });
    res.status(201).json(enrollResult);
  })
);

// @desc: create and enroll student to course, also handle if the student already exist
// @route: POST /api/students/courses/:courseId
// @access: public
router.post(
  "/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    // 1. check if the student has been created
    //? assume the the fullname of student is unique, there is not case that 2 students have exactly same name.
    const course = await Course.findByPk(req.params.courseId);
    const existedStudent = await Student.findOne({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    //  2. enroll student to course
    if (existedStudent) {
      const enrollResult = await existedStudent.addCourse(course);
      res.status(201).json(enrollResult);
    } else {
      const newStudent = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      const enrollResult = await newStudent.addCourse(course);
      res.status(201).json(enrollResult);
    }
  })
);

// @desc: unenroll individual student
// @route: DELETE /api/students/:studentId/courses/courseId
// @access: public
router.delete(
  "/:studentId/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    // unenrolle -> remove the row in course_student
    const enrollement = await Course_Student.findOne({
      where: {
        studentId: req.params.studentId,
        courseId: req.params.courseId,
      },
    });

    //! because null.destroy() have error, so computer will throw an 500 interal error message if the student don't enrolled to this course

    await enrollement.destroy();

    res.sendStatus(204);
  })
);

// @desc: delete student
// @route: DELETE /api/students/:studentId
// @access: public
// ? what would happen to course_student table
// ? delete the student, and also delete the enroll history / enroll record?
router.delete(
  "/:studentId",
  asyncHandler(async (req, res, next) => {
    // 1. unenroll this student
    const student = await Student.findByPk(req.params.studentId);
    const enrollement = await student.getCourses();
    await student.removeCourses(enrollement);
    // 2. delete this student
    const result = await student.destroy();
    res.status(204).json(result);
  })
);

module.exports = router;
