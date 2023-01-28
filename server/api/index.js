const router = require("express").Router();

// Test middleware
router.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Sub-router, start with /api
router.use("/template", require("./templateRouter"));
router.use("/authentication", require("./authenticationRoutes"));

module.exports = router;
