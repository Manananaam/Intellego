//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/userModel");
const Assessment = require("./models/assessmentModel");
const Question = require("./models/questionModel");
const Student = require("./models/studentModel");
const Course = require("./models/courseModel");
const Submission = require("./models/submissionModel");
const Course_Assessment = require("./models/course_assessmentModel");
const Course_Student = require("./models/course_studentModel");

User.hasMany(Course);
Course.belongsTo(User);

User.hasMany(Assessment);
Assessment.belongsTo(User);

Course.belongsToMany(Student, { through: Course_Student });
Student.belongsToMany(Course, { through: Course_Student });

Course.belongsToMany(Assessment, { through: Course_Assessment });
Assessment.belongsToMany(Course, { through: Course_Assessment });
Course.hasMany(Assessment);
Assessment.hasMany(Course);
Course.belongsTo(Assessment);
Assessment.belongsTo(Course);

Question.hasMany(Submission);
Submission.belongsTo(Question);

Student.hasMany(Submission);
Submission.belongsTo(Student);

Course.hasMany(Submission);
Submission.belongsTo(Course);

Assessment.hasMany(Question);
Question.belongsTo(Assessment);

Assessment.hasMany(Submission);
Submission.belongsTo(Assessment);

module.exports = {
  db,
  models: {
    User,
    Assessment,
    Question,
    Student,
    Course,
    Submission,
    Course_Assessment,
    Course_Student,
  },
};
