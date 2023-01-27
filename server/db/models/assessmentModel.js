const db = require("../db");
const Sequelize = require("sequelize");
const Course = require("./courseModel");

const Assessment = db.define("assessment", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // teacherId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Teacher,
  //     key: "id",
  //   },
  // },

  //how do we include when it's many to many (questions, courses)?
});

/*
NOTES:
will need relationship with teacherId, courseId, questionId
schema diagram doesn't currently include question, but we do need that

*/

module.exports = Assessment;
