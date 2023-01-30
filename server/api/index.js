const router = require("express").Router();

// Test middleware
router.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Sub-router, start with /api
router.use("/template", require("./templateRouter"));
router.use("/students", require("./studentRouter"));
router.use("/courses", require("./courseRouter"));
router.use("/submissions", require("./submissionRouter"));

module.exports = router;
