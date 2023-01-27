const db = require("../db");
const Sequelize = require("sequelize");
const Course = require("./courseModel");
const Assessment = require("./assessmentModel");

const Course_Assessment = db.define("course_assessment", {
  courseId: {
    type: Sequelize.INTEGER,
    references: {
      model: Course,
      key: "id",
    },
  },
  assessmentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Assessment,
      key: "id",
    },
  },
});
module.exports = Course_Assessment;
