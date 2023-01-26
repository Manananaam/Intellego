const db = require("../db");
const Sequelize = require("sequelize");

const Template = db.define("template", {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Template;
