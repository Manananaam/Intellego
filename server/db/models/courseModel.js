const db = require("../db");
const Sequelize = require("sequelize");
const Course = db.define("course", {
  // id: {
  //   type: Sequelize.INTEGER,
  // },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gradeLevel: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // studentId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: "Student",
  //     referencesKey: "id",
  //   },
  // },
});
module.exports = Course;
