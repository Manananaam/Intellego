const db = require("../db");
const Sequelize = require("sequelize");
const Course = require("./courseModel");
const Question = require("./questionModel");
const Submission = require("./submissionModel");

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

// Instance method the get the grade for the assessment
Student.prototype.calculateGradeAtAssessment = async function (assessmentId) {
  const questions = await Question.findAll({
    where: {
      assessmentId: assessmentId,
    },
    include: [
      {
        model: Submission,
        where: {
          studentId: this.id,
        },
      },
    ],
  });

  const total_grade = Math.round(
    questions.reduce((acc, curr) => acc + curr.submissions[0].grade, 0) /
      questions.length
  );

  return total_grade;
};

Student.prototype.calculateOverallGradeAtCourse = async function (course) {
  const assessments = await course.getAssessments();
  const gradeAtEachAssessment = await Promise.all(
    assessments.map(async (assessement) => {
      return {
        id: assessement.id,
        title: assessement.title,
        grade: await this.calculateGradeAtAssessment(assessement.id),
      };
    })
  );
  const overall_grade = Math.round(
    gradeAtEachAssessment.reduce((acc, curr) => acc + curr.grade, 0) /
      assessments.length
  );

  return overall_grade;
};

module.exports = Student;
