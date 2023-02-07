const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const {
  models: { Assessment, Question, Submission },
} = require("../db");
const protectedRoute = require("./middleware");
const AppError = require("../utils/appError");
const Course = require("../db/models/courseModel");

// GET all assessments for a specific teacher (authorized)
router.get(
  "/",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const assessments = await Assessment.findAll({
      where: {
        userId: req.user.id,
      },
      include: {
        model: Question,
        include: { model: Submission }
      }
    });
    if (!assessments) {
      throw new AppError(
        `The this user does not have assessments or does not have access to these assessments.`,
        400
      );
    }
    res.status(200).json({
      data: {
        assessments,
      },
    });
  })
);

//GET old route no authentication

// router.get(
//   "/",
//   asyncHandler(async (req, res, next) => {
//     const assessments = await Assessment.findAll({
//       include: {
//         model: Question,
//         include: { model: Submission },
//       },
//     });
//     res.status(200).json({ assessments });
//   })
// );

// Na: add a route for show assessment and questions in student view screen
// @desc: fetch assessment and it's questions
// @route: /api/assessments/:assessmentId/courses/:courseId/questions
// @access: public
//authentication added
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
        `The course with id (${req.params.courseId}) does not exist or is inactive.`,
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
        `The assessment belonging to this assessment Id (${req.params.assessmentId}) does not exist or is inactive.`,
        400
      );
    }
    // 3. check if the assessment had been assigned to the course?
    if (!(await course.hasAssessment(assessment))) {
      throw new AppError(
        `The assessment (${assessment.title}) hasn't been assigned to course(${course.name}) .`,
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
//authentication added
router.get(
  "/:assessmentId",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.findOne({
      where: {
        userId: req.user.id,
        id: req.params.assessmentId,
      },
      include: {
        model: Question,
        include: {
          model: Submission,
        },
      },
  });
    if (!assessment) {
      throw new AppError(
        `The assessment with id (${req.params.assessmentId}) does not exist or is unauthorized.`,
        400
      );
    }
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
  protectedRoute,
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
        newAssessment: {
          questions: { ...newQuestion, submissions: [] },
        },
      },
    });
  })
);

//PUT: assign assessment to more than one class
router.put(
  "/:assessmentId",
  protectedRoute,
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
  protectedRoute,
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
