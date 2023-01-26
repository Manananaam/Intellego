const Sequelize = require("sequelize");
const db = require("../db");

const Submission = db.define("submission", {
  response: {
    type: Sequelize.TEXT,
  },
  grade: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100,
    },
  },
  // questionId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: "Question",
  //     referencesKey: "id",
  //   },
  // },
  // studentId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: "Student",
  //     referencesKey: "id",
  //   },
  // },
});

module.exports = Submission;
