const db = require("../db");
const Sequelize = require("sequelize");
const Course = require("./courseModel");

const Assessment = db.define("assessment", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Assessment;
