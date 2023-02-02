const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const {
  models: { Question, Submission },
} = require("../db");

//GET grab a question by id, include all submissions for that question
//bug > this route isn't working right now and I'm not sure why
router.get(
  "/:questionId",
  asyncHandler(async (req, res, next) => {
    const question = await Question.findByPk(req.params.questionId, {
      include: {
        model: Submission,
      },
    });
    res.status(200).json({
      data: {
        question,
      },
    });
  })
);

//POST create a new question
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const newQuestion = await Question.create({
      questionText: req.body.questionText,
    });
    res.status(201).json({
      data: {
        newQuestion,
      },
    });
  })
);

//PUT change the text on a question
router.put(
  "/:questionId",
  asyncHandler(async (req, res, next) => {
    const question = await Question.findByPk(req.params.questionId);
    await question.update(req.body);
    res.status(200).json({
      data: {
        question,
      },
    });
  })
);

//DELETE get rid of the question
//same questions from assessmentRouter relevant here

router.delete(
  "/:questionId",
  asyncHandler(async (req, res, next) => {
    await Question.destroy({
      where: {
        id: req.params.questionId,
      },
    });
    res.sendStatus(204);
  })
);

module.exports = router;
