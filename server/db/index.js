//this is the access point for all things database related!

const db = require("./db");

const Template = require("./models/templateModel");
const User = require("./models/userModel");

//associations could go here!

module.exports = {
  db,
  models: {
    Template,
    User,
  },
};
