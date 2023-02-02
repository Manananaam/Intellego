const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const {
  models: { Assessment, Question, Submission },
} = require("../db");
const protectedRoute = require("./middleware");
const AppError = require("../utils/appError");
const Course = require("../db/models/courseModel");

//GET all assessments for a specific teacher
//(teacher id will be handled in a different way...)
// router.get(
//   "/",
//   protectedRoute,
//   asyncHandler(async (req, res, next) => {
//     const assessments = await Assessment.findAll({
//       where: {
//         userId: req.user.id,
//       },
//     });
//     res.status(200).json({
//       data: {
//         assessments,
//       },
//     });
//   })
// );

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const assessments = await Assessment.findAll({
      include: {
        model: Question,
      },
    });
    res.status(200).json({ assessments });
  })
);

// Na: add a route for show assessment and questions in student view screen
// @desc: fetch assessment and it's questions
// @route: /api/assessments/:assessmentId/courses/:courseId/questions
// @access: public
router.get(
  "/:assessmentId/courses/:courseId/questions",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId, {
      where: {
        isActive: true,
      },
    });
    if (!course) {
      throw new AppError(
        `The course with id (${req.params.courseId}) is not exist or active.`,
        400
      );
    }

    const assessment = await Assessment.findByPk(req.params.assessmentId, {
      where: {
        isActive: true,
      },
      include: {
        model: Question,
      },
    });

    // 2. check if the assessment with the id exist or active
    if (!assessment) {
      throw new AppError(
        `The assessment belong to this assessment Id (${req.params.assessmentId}) don't exist or active.`,
        400
      );
    }
    // 3. check if the assessment had been assigned to the course?
    if (!(await course.hasAssessment(assessment))) {
      throw new AppError(
        `The assessment (${assessment.title}) haven't been assigned to course(${course.name}) .`,
        400
      );
    }

    // if everything is ok, send the assessment and questions as response
    res.status(200).json({
      data: {
        assessment,
      },
    });
  })
);

//GET: assessment and all questions for a given assessment
//also get all associated submissions
//this is the working route I should use for the front end for submissions confirmation
router.get(
  "/:assessmentId",
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.findByPk(req.params.assessmentId, {
      include: {
        model: Question,
        include: {
          model: Submission,
        },
      },
    });
    res.status(200).json({
      data: {
        assessment,
      },
    });
  })
);

//POST: new assessment
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const newAssessment = await Assessment.create({
      title: req.body.title,
    });
    const newQuestion = await Question.create({
      questionText: req.body.questionText,
    });
    await newQuestion.setAssessment(newAssessment);
    res.status(201).json({
      data: {
        newAssessment,
        newQuestion,
      },
    });
  })
);

//PUT: assign assessment to more than one class
router.put(
  "/:assessmentId",
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.findByPk(req.params.assessmentId);
    await assessment.update(req.body);
    res.status(200).json({
      data: {
        assessment,
      },
    });
  })
);

//DELETE trash assessment
//question: what happens with associations once created in other tables?
router.delete(
  "/:assessmentId",
  asyncHandler(async (req, res, next) => {
    await Assessment.destroy({
      where: {
        id: req.params.assessmentId,
      },
    });
    res.sendStatus(204);
  })
);

module.exports = router;
