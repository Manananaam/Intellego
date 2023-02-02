const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

const Submission = require("../db/models/submissionModel");
const Question = require("../db/models/questionModel");
const Course = require("../db/models/courseModel");
const Assessment = require("../db/models/assessmentModel");

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
  asyncHandler(async (req, res, next) => {
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

router.get(
  "/assessments/:assessmentId/questions/:questionId/submissions/:submissionId",
  asyncHandler(async (req, res, next) => {
    const assessment = await Submission.findByPk(req.params.submissionId);
    res.status(200).json({
      data: {
        assessment,
      },
    });
  })
);

// @desc: create a bunch of submission
// @route: /api/submissions/courses/:coureseId/assessments/:assessmentId/students/:studentId
// @access: public
router.post(
  "/courses/:courseId/assessments/:assessmentId/students/:studentId",
  asyncHandler(async (req, res, next) => {
    const submissions = [];
    for (const questionId of Object.keys(req.body)) {
      const submission = await Submission.create({
        response: req.body[questionId],
        questionId,
        courseId: req.params.courseId,
        assessmentId: req.params.assessmentId,
        studentId: req.params.studentId,
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
  asyncHandler(async (req, res, next) => {
    const deletedSubmission = await Submission.findByPk(
      req.params.submissionId
    );
    res.send(await deletedSubmission.destroy());
  })
);

module.exports = router;
