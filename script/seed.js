"use strict";

const {
  db,
  models: {
    Assessment,
    Course,
    Question,
    Student,
    Submission,
    User,
    Course_Assessment,
    Course_Student,
  },
} = require("../server/db");

// data that used to seed
const templateData = require("./data/templates");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  //Creating Users
  const users = await Promise.all(
    templateData.userSeed.map((data) => {
      return User.create(data);
    })
  );

  //Creating Courses
  const courses = await Promise.all(
    templateData.courseSeed.map((data) => {
      return Course.create(data);
    })
  );

  //Creating Assessments
  const assessments = await Promise.all(
    templateData.assessmentSeed.map((data) => {
      return Assessment.create(data);
    })
  );

  //Creating Questions
  const questions = await Promise.all(
    templateData.questionSeed.map((data) => {
      return Question.create(data);
    })
  );

  //Creating Students
  const students = await Promise.all(
    templateData.studentSeed.map((data) => {
      return Student.create(data);
    })
  );

  //Creating Submissions
  const submissions = await Promise.all(
    templateData.submissionSeed.map((data) => {
      return Submission.create(data);
    })
  );

  //Creating Course Assessment Joins
  const courseAssess = await Promise.all(
    templateData.courseAssessmentsSeed.map((data) => {
      return Course_Assessment.create(data);
    })
  );

  //Creating Course Student Joins
  const courseStudent = await Promise.all(
    templateData.courseRosterSeed.map((data) => {
      // console.log(
      //   `test for course roster issue ${data.studentId} ${data.courseId}`
      // );
      return Course_Student.create(data);
    })
  );

  console.log(`seeded ${users.length} user data `);
  console.log(`seeded ${courses.length} course data`);
  console.log(`seeded ${assessments.length} assessment data`);
  console.log(`seeded ${questions.length} question data`);
  console.log(`seeded ${students.length} student data`);
  console.log(`seeded ${submissions.length} submission data`);
  console.log(
    `seeded ${courseAssess.length} course-assessment relationship data`
  );
  console.log(
    `seeded ${courseStudent.length} course-student relationship data`
  );
  console.log(`seeded successfully`);
  return {
    templateData,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
