const express = require("express");
const router = express.Router();
const {
  testTemplate,
  testError,
  fetchTemplateData,
} = require("../controllers/templateController");

router.route("/test").get(testTemplate);

router.route("/error").get(testError);

router.get("/db", fetchTemplateData);

module.exports = router;
