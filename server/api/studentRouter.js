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
    const total_grade = Math.round(
      submissions.reduce((acc, curr) => acc + curr.grade, 0) /
        submissions.length
    );
    res.status(200).json({
      total_grade,
    });
  })
);

// @desc: fetch a list of students' grade for this assessment
// ! what if the student didn't submit any submission yet? that case the grade belongs to that student won't exist.
// ? I only can get a list of student's grade for those who had submit their answer
// TODO: At front-end, for those student who haven't made any submission, show "missing" as grade
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    // 2. get a list of student with their submission in the assessment
    const students = await Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Submission,
          where: {
            questionId: {
              [Op.in]: questions.map((el) => el.id),
            },
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: ["id"],
    });
    // 3. calculate the grade
    const results = students.map((el) => {
      return {
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        total_grade: Math.round(
          el.submissions.reduce((acc, curr) => acc + curr.grade, 0) /
            el.submissions.length
        ),
      };
    });

    res.status(200).json({
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

// @desc: fetch individual student's grade for each assessment
// @route: GET /api/students/:studentId/courses/:courseId/assessments
// @access: public
router.get(
  "/:studentId/courses/:courseId/assessments",
  asyncHandler(async (req, res, next) => {
    // 1. get all assessments related to this course
    // 2. find all question related to this assessments
    // 3. get all submission this student submit and related to this assessment's question

    const course = await Course.findByPk(req.params.courseId);
    const assessments = await course.getAssessments({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Question,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: Submission,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
              studentId: req.params.studentId,
            },
          },
        },
      ],
    });

    // 4. return list of grade for each assessment
    const student = await Student.findByPk(req.params.studentId);

    const listOfGrade = assessments.map((assessment) => {
      const total_grade = assessment.questions.reduce(
        (acc, curr) => acc + curr.submissions[0].toJSON().grade,
        0
      );
      return {
        id: assessment.id,
        title: assessment.title,
        total_grade: total_grade,
      };
    });

    res.json({
      student,
      results: listOfGrade.length,
      listOfGrade,
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

// @desc: get student's list that belong to this course
// @route: GET /api/students/courses/:courseId
// @access: public
router.get(
  "/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId);
    const students = await course.getStudents({
      order: ["id"],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({
      numOfStudents: students.length,
      students: students.map((el) => {
        return { id: el.id, firstName: el.firstName, lastName: el.lastName };
      }),
    });
  })
);

// @desc: get individual student's enrollments
// @route: GET /api/students/:studentId/enrollments
// @access: public
router.get(
  "/:studentId/enrollments",
  asyncHandler(async (req, res, next) => {
    const students = await Student.findByPk(req.params.studentId);
    const enrollments = await students.getCourses({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({
      results: enrollments.length,
      enrollments: enrollments.map((el) => {
        return {
          id: el.id,
          name: el.name,
          subject: el.subject,
          gradeLevel: el.gradeLevel,
        };
      }),
    });
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
    const student = await Student.findByPk(req.params.studentId);
    const course = await Course.findByPk(req.params.courseId);
    await student.addCourse(course);
    res.status(201).json({
      student,
      course,
    });
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
      await existedStudent.addCourse(course);
      res.status(201).json({
        student: existedStudent,
        course,
      });
    } else {
      const newStudent = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      await newStudent.addCourse(course);
      res.status(201).json({ student: newStudent, course });
    }
  })
);

// @desc: unenroll individual student
// @route: DELETE /api/students/:studentId/courses/:courseId
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
