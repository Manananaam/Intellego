const db = require("../db");
const Sequelize = require("sequelize");
const Course = require("./courseModel");

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  //do we need this??
  // courseId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Course,
  //     key: "id",
  //   },
  // },
});
module.exports = Student;
