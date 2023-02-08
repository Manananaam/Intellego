const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

const Submission = require("../db/models/submissionModel");
const Question = require("../db/models/questionModel");
const Course = require("../db/models/courseModel");
const Assessment = require("../db/models/assessmentModel");
const Student = require("../db/models/studentModel");
const protectedRoute = require("./middleware");

//Once a question is complete, it becomes a submission.

//Find all submissions:

router.get(
  "/courses/:courseId/assessments/:assessmentId/submissions",
  asyncHandler(async (req, res, next) => {
    const submissions = await Question.findAll({
      where: {
        assessmentId: req.params.assessmentId,
        include: {
          model: Submission,
        },
      },
    });
    res.status(200).json({
      data: {
        submissions,
      },
    });
  })
);
//get all submissions for one question

router.get(
  "/assessments/:assessmentId/questions/:questionId/submissions",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.findOne(req.params.assessmentId);
    if (assessment.userId !== req.user.id) {
      res.send("not yours");
    }
    const submissions = await Question.findByPk(req.params.questionId, {
      include: {
        model: Submission,
      },
    });
    res.status(200).json({
      data: {
        submissions,
      },
    });
  })
);

//To get a specific submission:
//MLD note - making change to route URL, but preserving original URL here in case someone wants me to change it back
// "/assessments/:assessmentId/questions/:questionId/submissions/:submissionId"

router.get(
  "/:submissionId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    // const assessment = await Assessment.findByPk(req.params.assessmentId);
    // if (assessment.userId !== req.user.id) {
    //   res.send("not yours");
    // }
    const sub = await Submission.findByPk(req.params.submissionId, {
      include: { model: Assessment },
    });
    if (sub.assessment.userId !== req.user.id) {
      res.send("You do not have access to this page.");
    }
    res.status(200).json(sub);
  })
);

// @desc: create a bunch of submission
// @route: /api/submissions/courses/:coureseId/assessments/:assessmentId/students/:studentId
// @access: public
router.post(
  "/courses/:courseId/assessments/:assessmentId/students/:studentId",
  asyncHandler(async (req, res, next) => {
    const { courseId, assessmentId, studentId } = req.params;
    // guard condition before student submit their answer
    // 1. if the course with the id is exist or active
    const course = await Course.findByPk(courseId, {
      where: {
        isActive: true,
      },
    });
    if (!course) {
      throw new AppError(
        `The course with id: ${courseId} is not exist or active`,
        400
      );
    }
    // 2. if the assessment with the id is exist or active
    const assessment = await Assessment.findByPk(assessmentId, {
      where: {
        isActive: true,
      },
    });
    if (!assessment) {
      throw new AppError(
        `The assessment with id: ${assessmentId} is not exist or active`,
        400
      );
    }

    // 3. if the assessment belong to the course?
    if (!(await course.hasAssessment(assessment))) {
      throw new AppError(
        `The assessment (${assessment.title}) haven't been assigned to course(${course.name}) .`,
        400
      );
    }

    // 4. if the student exist
    const student = await Student.findByPk(studentId);
    if (!student) {
      throw new AppError(
        `The student with id: ${studentId} is not exist.`,
        400
      );
    }
    // 5.if the student have been enrolled to the course?
    if (!(await course.hasStudent(student))) {
      throw new AppError(
        `The student (${student.firstName} ${student.lastName}) haven't been enrolled to the course(${course.name}) .`,
        400
      );
    }

    // 6. check if the student had submitted before?
    const qusetionIds = Object.keys(req.body).map((el) => Number(el));
    const existedSubmissions = await Submission.findAll({
      where: {
        studentId,
        questionId: {
          [Sequelize.Op.in]: qusetionIds,
        },
      },
    });
    if (existedSubmissions.length > 0) {
      throw new AppError(
        `The student (${student.firstName} ${student.lastName}) had submitted the answer to the assessment(${assessment.title}) before. You can't submit anymore!`,
        400
      );
    }
    // if everything is ok, store the submission in database
    const submissions = [];
    for (const questionId of Object.keys(req.body)) {
      const submission = await Submission.create({
        response: req.body[questionId],
        questionId,
        courseId: courseId,
        assessmentId: assessmentId,
        studentId: studentId,
      });
      submissions.push(submission);
    }

    res.status(201).json({
      submissions,
    });
  })
);

//To change entire submission:

router.put(
  "/assessments/:assessmentId/questions/:questionId/submissions/:submissionId",
  asyncHandler(async (req, res, next) => {
    const submission = await Submission.findByPk(req.params.submissionId);
    await submission.update(req.body);
    res.status(200).json({
      data: {
        submission,
      },
    });
  })
);

//To delete a submission:

router.delete(
  "/assessments/:assessmentId/submissions/:submissionId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.fineOne(req.params.assessmentId);
    if (assessment.userId !== req.user.id) {
      res.send("not yours");
    }
    const deletedSubmission = await Submission.findByPk(
      req.params.submissionId
    );
    res.send(await deletedSubmission.destroy());
  })
);

module.exports = router;
