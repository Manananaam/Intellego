const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const protectedRoute = require("./middleware");
const {
  models: { Student, Course },
} = require("../db");

// @desc: fetch a list of overall grade of student in the course
// @route: /api/students/courses/:courseId/overallGrade
// @access: private (mark with authentication)
router.get(
  "/courses/:courseId/overallGrade",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }

    const students = await course.getStudents();
    const overallGradeForEachStudent = await Promise.all(
      students.map(async (student) => {
        const { overall_grade, gradeAtEachAssessment } =
          await student.calculateOverallGradeAtCourse(course);
        return {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          overall_grade,
          gradeAtEachAssessment,
        };
      })
    );
    res.json({
      course,
      numOfStudents: students.length,
      overallGradeForEachStudent,
    });
  })
);

// @desc: fetch the student's grade in this assessment
// @route: /api/students/:studentId/assessment/:assessmentId
// @access: private (mark with authentication)
router.get(
  "/:studentId/assessment/:assessmentId",
  protectedRoute,
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
// @route: /api/students/courses/:courseId/assessment/:assessmentId
// @access: private (mark with authentication)
router.get(
  "/courses/:courseId/assessment/:assessmentId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    // 1. fetch a list of student, who had been assigned to this assessment in the course
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }
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
// @access: private (mark with authentication)
router.get(
  "/:studentId/courses/:courseId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }
    const student = await Student.findByPk(req.params.studentId);
    const overall_grade = await student.calculateOverallGradeAtCourse(course);

    res.status(200).json({ overall_grade });
  })
);

// @desc: fetch individual student's grade for each assessment
// @route: GET /api/students/:studentId/courses/:courseId/assessments
// @access: private (mark with authentication)
router.get(
  "/:studentId/courses/:courseId/assessments",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }
    const assessments = await course.getAssessments({
      where: { userId: req.user.id },
    });
    const student = await Student.findByPk(req.params.studentId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
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
      student,
      gradeAtEachAssessment,
    });
  })
);

// @desc: get individual student's information
// @route: GET /api/students/:studentId
// @access: private
router.get(
  "/:studentId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const students = await Student.findByPk(req.params.studentId);
    res.status(200).json(students);
  })
);

// @desc: get student's list that belong to this course
// @route: GET /api/students/courses/:courseId
// @access: private
router.get(
  "/courses/:courseId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }
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
// @access: private
router.get(
  "/:studentId/enrollments",
  protectedRoute,
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
// @access: private
router.post(
  "/:studentId/courses/:courseId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    //!500 sequelize error: student had enrolled to this course
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }
    const student = await Student.findByPk(req.params.studentId);
    await student.addCourse(course);
    res.status(201).json({
      student,
      course,
    });
  })
);

// @desc: create and enroll student to course, also handle if the student already exist
// @route: POST /api/students/courses/:courseId
// @access: private
router.post(
  "/courses/:courseId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    // 1. check if the student has been created
    //? assume the the fullname of student is unique, there is not case that 2 students have exactly same name.
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }
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

router.put(
  "/:studentId",
  asyncHandler(async (req, res, next) => {
    const student = await Student.findByPk(req.params.studentId);
    await student.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(200).json({ student });
  })
);

// @desc: unenroll individual student
// @route: DELETE /api/students/:studentId/courses/:courseId
// @access: private
router.delete(
  "/:studentId/courses/:courseId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    // unenrolle -> remove relationship between student and this course
    const course = await Course.findOne({
      where: { id: req.params.courseId, userId: req.user.id },
    });

    if (!course) {
      throw new AppError(
        `The course with id(${req.params.courseId}) don't belong to current logged in user.`,
        400
      );
    }
    const student = await Student.findByPk(req.params.studentId);
    const enrollement = await student.removeCourse(course);

    res.status(204).json({
      unenrollNumOfCourse: enrollement,
    });
  })
);

/**
 * @desc: verify student ID
 * @author: Na Lin
 * @route: GET /api/students/verify/:studentId/courses/:courseId
 * @returns: responce with true/false
 * @access: public
 */
router.get(
  "/verify/:studentId/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    const { studentId, courseId } = req.params;
    const student = await Student.findByPk(studentId);
    const verifyResult = !student
      ? false
      : await student.belongToCourse(courseId);
    res.status(200).json({
      result: verifyResult,
    });
  })
);
//NATR NOTE FOR TOMORROW: maybe send id backfrom router?
// @desc: delete student
// @route: DELETE /api/students/:studentId
// @access: private
// ? what would happen to course_student table
// ? delete the student, and also delete the enroll history / enroll record?
router.delete(
  "/:studentId",
  protectedRoute,
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
