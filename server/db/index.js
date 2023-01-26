//this is the access point for all things database related!

const db = require("./db");

const Template = require("./models/templateModel");
const User = require("./models/userModel");
const Assessment = require("./models/assessmentModel");
const Question = require("./models/questionModel");
const Student = require("./models/studentModel");
const Course = require("./models/courseModel");
const Submission = require("./models/submissionModel");

User.hasMany(Course);
Course.belongsTo(User);

User.hasMany(Assessment);
Assessment.belongsTo(User);

Course.belongsToMany(Student, { through: "courseRoster" });
Student.belongsToMany(Course, { through: "courseRoster" });

Course.belongsToMany(Assessment, { through: "courseAssessments" });
Assessment.belongsToMany(Course, { through: "courseAssessments" });

Question.hasMany(Submission);
Submission.belongsTo(Question);

Student.hasMany(Submission);
Submission.belongsTo(Student);

Assessment.hasMany(Question);
Question.belongsTo(Assessment);

module.exports = {
  db,
  models: {
    Template,
    User,
    Assessment,
    Question,
    Student,
    Course,
    Submission,
  },
};
