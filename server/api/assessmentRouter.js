const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const {
  models: { Assessment, Question, Submission, Course, Student },
} = require("../db");

const protectedRoute = require("./middleware");
const AppError = require("../utils/appError");

// GET all assessments for a specific teacher (authorized)
router.get(
  "/",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const assessments = await Assessment.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Question,
          include: { model: Submission },
        },
        { model: Course },
      ],
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
      include: [
        {
          model: Question,
          include: {
            model: Submission,
          },
        },
      ],
    });
    if (!assessment) {
      throw new AppError(
        `The assessment with id (${req.params.assessmentId}) does not exist or is unauthorized.`,
        400
      );
    }

    // find associated course related to this assessment
    const courses = await assessment.getCourses();

    res.status(200).json({
      data: {
        assessment,
        associatedCourse: courses,
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
      userId: req.user.id,
      title: req.body.title,
    });
    // add associate with course if the user assign the assessment to existed course.
    if (req.body.courseId) {
      const course = await Course.findByPk(req.body.courseId);
      newAssessment.addCourse(course);
    }

    const newQuestions = await Promise.all(
      req.body.questions.map(async (question) => {
        const newQuestion = await Question.create({
          questionText: question,
        });
        await newQuestion.setAssessment(newAssessment);
        return newQuestion;
      })
    );

    res.status(201).json({
      data: {
        newAssessment: {
          questions: newQuestions.map((el) => {
            return { ...el.toJSON(), submissions: [] };
          }),
        },
      },
    });
  })
);

//PUT: assign assessment to more than one class, edit title
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

//@desc: remove specific course association from an assessment
router.delete(
  "/:assessmentId/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    const courseId = req.params.courseId;
    const course = await Course.findByPk(req.params.courseId);
    const assessment = await Assessment.findByPk(req.params.assessmentId);
    const removeCourse = await assessment.removeCourse(course);
    res.json({ courseId });
  })
);

//@desc: add specific course association to an assessment
router.post(
  "/:assessmentId/courses/:courseId",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.courseId);
    const assessment = await Assessment.findByPk(req.params.assessmentId);
    const addCourse = await assessment.addCourse(course);
    res.json({ course });
  })
);

//@desc: add new question to specific assessment
router.post(
  "/:assessmentId/questions",
  asyncHandler(async (req, res, next) => {
    const assessmentId = req.params.assessmentId;
    const { questionText } = req.body;
    res.json(await Question.create({ questionText, assessmentId }));
  })
);

//desc: route by Madeleine for use on grading page
router.get(
  "/:assessmentId/courses/:courseId/submissions",
  protectedRoute,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { assessmentId, courseId } = req.params;

    const students = await Student.findAll({
      include: {
        model: Submission,
        where: { assessmentId, courseId },
      },
    });

    const submissions = await Assessment.findAll({
      where: { id: assessmentId, userId: userId },
      include: [
        {
          model: Course,
          where: {
            id: courseId,
          },
          include: {
            model: Student,
            include: {
              model: Submission,
              where: {
                courseId,
                assessmentId,
              },
            },
          },
        },
        { model: Question },
      ],
    });

    res.json(students);
  })
);

module.exports = router;
