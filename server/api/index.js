const router = require("express").Router();

// Test middleware
router.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Sub-router, start with /api
router.use("/template", require("./templateRouter"));
//assessmentRouter
router.use("/assessments", require("./assessmentRouter"));
//questionRouter
router.use("/questions", require("./questionRouter"));

module.exports = router;
