const db = require("../db");
const Sequelize = require("sequelize");

const Question = db.define("question", {
  questionText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Question;
