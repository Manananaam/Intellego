const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { Student, Course, Course_Student, Question, Submission, Assessment },
} = require("../db");
// test

// @desc: fetch the student's grade in this assessment
// @route: /api/students/:studentId/assessment/:assessmentId
// @access: -
router.get(
  "/:studentId/assessment/:assessmentId",
  asyncHandler(async (req, res, next) => {
    //  1. use assessmentId to get all question related to this assessment
    const questions = await Question.findAll({
      where: {
        assessmentId: req.params.assessmentId,
      },
    });

    // 2. use questionId and studentId to fetch all submission that related to this assessment this student submit
    const questionIds = questions.map((question) => question.id);
    const submissions = await Submission.findAll({
      where: {
        questionId: {
          [Op.in]: questionIds,
        },
        studentId: req.params.studentId,
      },
    });

    // return the grade of assessment this student made
    const grade = submissions.reduce((acc, curr) => acc + curr.grade, 0);
    res.json(grade);
  })
);

// @desc: fetch a list of students' grade for this assessment
// @route: /api/students/assessment/:assessmentId
// @access: -
router.get(
  "/assessment/:assessmentId",
  asyncHandler(async (req, res, next) => {
    // 1. use assessmentId to get all question related to this assessment
    const questions = await Question.findAll({
      where: {
        assessmentId: req.params.assessmentId,
      },
    });
    // 2. group submission by questionId and studentId
    const submission = await Submission.findAll({
      where: {
        questionId: {
          [Op.in]: questions.map((el) => el.id),
        },
      },
      attributes: [
        "studentId",
        [Sequelize.fn("SUM", Sequelize.col("grade")), "total_grade"],
      ],
      group: ["studentId"],
      order: ["studentId"],
    });

    const students = await Student.findAll({
      where: {
        id: {
          [Op.in]: submission.map((el) => el.studentId),
        },
      },
      order: ["id"],
    });
    // 3. return
    console.log(submission[0].toJSON());
    const results = students.map((el, idx) => {
      return {
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        total_grade: submission[idx].toJSON().total_grade,
      };
    });

    res.json({
      results,
    });
  })
);

// @desc: fetch individual student's overall grade in this class
// @route: GET /api/students/:studentId/courses/:courseId
// @access: public
router.get(
  "/:studentId/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId);
    const assessments = await course.getAssessments();
    const questions = await Question.findAll({
      where: {
        assessmentId: {
          [Op.in]: assessments.map((el) => el.id),
        },
      },
    });

    const submissions = await Submission.findAll({
      where: {
        studentId: req.params.studentId,
        questionId: {
          [Op.in]: questions.map((el) => el.id),
        },
      },
    });

    const student = await Student.findByPk(req.params.studentId, {
      attributes: ["id", "firstName", "lastName"],
    });

    res.status(200).json({
      student: {
        ...student.toJSON(),
        overall_grade: submissions.reduce((acc, curr) => acc + curr.grade, 0),
      },
    });
  })
);

// @desc: get individual student's information
// @route: GET /api/students/:studentId
// @access: public
router.get(
  "/:studentId",
  asyncHandler(async (req, res, next) => {
    const students = await Student.findByPk(req.params.studentId);
    res.status(200).json(students);
  })
);

// @desc: get individual student's enrollments
// @route: GET /api/students/:studentId/enrollments
// @access: public
router.get(
  "/:studentId/enrollments",
  asyncHandler(async (req, res, next) => {
    const students = await Student.findByPk(req.params.studentId);
    const enrollments = await students.getCourses();
    res.send(enrollments);
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
    // unenrolle -> remove relationship between student and this course
    const course = await Course.findByPk(req.params.courseId);
    const student = await Student.findByPk(req.params.studentId);
    const enrollement = await student.removeCourse(course);

    res.status(204).json({
      unenrollNumOfCourse: enrollement,
    });
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
    const enrollements = await student.getCourses();
    await student.removeCourses(enrollements);
    // 2. delete this student
    const result = await student.destroy();
    res.status(204).json(result);
  })
);

module.exports = router;
