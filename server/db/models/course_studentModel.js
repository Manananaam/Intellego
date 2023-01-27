const db = require("../db");
const Sequelize = require("sequelize");
const Course = require("./courseModel");
const Student = require("./studentModel");

const Course_Student = db.define("course_student", {
  courseId: {
    type: Sequelize.INTEGER,
    references: {
      model: Course,
      key: "id",
    },
  },
  studentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
});
module.exports = Course_Student;
