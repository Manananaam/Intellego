const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  models: { Student, Course, Course_Student, Question, Submission, Assessment },
} = require("../db");

// @desc: fetch a list of overall grade of student in the course
// @route: /api/students/courses/:courseId
// @access: -
router.get(
  "/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId);
    const students = await course.getStudents();
    const overallGradeForEachStudent = await Promise.all(
      students.map(async (student) => {
        return {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          overall_grade: await student.calculateOverallGradeAtCourse(course),
        };
      })
    );
    res.json({
      numOfStudents: students.length,
      overallGradeForEachStudent,
    });
  })
);

// @desc: fetch the student's grade in this assessment
// @route: /api/students/:studentId/assessment/:assessmentId
// @access: -
router.get(
  "/:studentId/assessment/:assessmentId",
  asyncHandler(async (req, res, next) => {
    const student = await Student.findByPk(req.params.studentId);
    const total_grade = await student.calculateGradeAtAssessment(
      req.params.assessmentId
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
  "/courses/:courseId/assessment/:assessmentId",
  asyncHandler(async (req, res, next) => {
    // 1. fetch a list of student, who had been assigned to this assessment in the course
    const course = await Course.findByPk(req.params.courseId);
    const students = await course.getStudents();

    // 2. calculate the grade belongs to each student in the assessment
    const gradeForEachStudent = await Promise.all(
      students.map(async (student) => {
        return {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          total_grade: await student.calculateGradeAtAssessment(
            req.params.assessmentId
          ),
        };
      })
    );

    res.status(200).json({
      numsOfStudents: students.length,
      gradeForEachStudent,
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
    const student = await Student.findByPk(req.params.studentId);
    const gradeAtEachAssessment = await Promise.all(
      assessments.map((assessement) => {
        return student.calculateGradeAtAssessment(assessement.id);
      })
    );
    const overall_grade = Math.round(
      gradeAtEachAssessment.reduce((acc, curr) => acc + curr, 0) /
        assessments.length
    );

    res.status(200).json({ overall_grade });
  })
);

// @desc: fetch individual student's grade for each assessment
// @route: GET /api/students/:studentId/courses/:courseId/assessments
// @access: public
router.get(
  "/:studentId/courses/:courseId/assessments",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId);
    const assessments = await course.getAssessments();
    const student = await Student.findByPk(req.params.studentId);
    const gradeAtEachAssessment = await Promise.all(
      assessments.map(async (assessement) => {
        return {
          id: assessement.id,
          title: assessement.title,
          grade: await student.calculateGradeAtAssessment(assessement.id),
        };
      })
    );

    res.status(200).json({
      gradeAtEachAssessment,
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
