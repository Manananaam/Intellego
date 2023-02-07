const router = require("express").Router();

const protectedRoute = require("./middleware");
// Test middleware
router.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Sub-router, start with /api
router.use("/template", require("./templateRouter"));
router.use("/assessments", require("./assessmentRouter"));
router.use("/questions", require("./questionRouter"));
router.use("/students", require("./studentRouter"));
router.use("/courses", require("./courseRouter"));
router.use("/submissions", require("./submissionRouter"));
router.use("/authentication", require("./authenticationRoutes"));

module.exports = router;
