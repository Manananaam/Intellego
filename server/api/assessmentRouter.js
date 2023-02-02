const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const {
  models: { Assessment, Question, Submission },
} = require("../db");
const protectedRoute = require("./middleware");

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
      }
    });
    res.status(200).json({assessments});
  })
);

//GET: assessment and all questions for a given assessment
//also get all associated submissions
router.get(
  "/:assessmentId",
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.findByPk(req.params.assessmentId, {
      include: {
        model: Question,
        include: {
          model: Submission,
        }
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
