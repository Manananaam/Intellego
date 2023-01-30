const userSeed = [
  {
    id: 1,
    firstName: "Maxiel",
    lastName: "Coder",
    email: "test@email.com",
    password: "123123",
  },
];
const assessmentSeed = [
  {
    id: 5,
    title: "Test Assessment",
    courseId: 14,
    userId: 1,
  },
];
const courseSeed = [
  {
    id: 14,
    name: "Test Course",
    subject: "ELA",
    gradeLevel: 3,
    userId: 1,
  },
];
const questionSeed = [
  {
    id: 1,
    questionText: "This is a sample question",
    assessmentId: 5,
  },
  {
    id: 2,
    questionText: "This is a sample question",
    assessmentId: 5,
  },
  {
    id: 3,
    questionText: "This is a sample question",
    assessmentId: 5,
  },
];
const studentSeed = [
  {
    id: 100,
    firstName: "Miso",
    lastName: "Cat",
  },
];
const submissionSeed = [
  {
    id: 1,
    response: "This is a sample response.",
    questionId: 1,
    studentId: 100,
    grade: 1,
  },
  {
    id: 2,
    response: "This is a sample response.",
    questionId: 2,
    studentId: 100,
    grade: 2,
  },
  {
    id: 3,
    response: "This is a sample response.",
    questionId: 3,
    studentId: 100,
    grade: 0,
  },
];

const courseAssessmentsSeed = [{ courseId: 14, assessmentId: 5 }];
const courseRosterSeed = [{ studentId: 100, courseId: 14 }];

module.exports = {
  userSeed,
  assessmentSeed,
  courseSeed,
  questionSeed,
  studentSeed,
  submissionSeed,
  courseAssessmentsSeed,
  courseRosterSeed,
};

/*
git remote set-url origin [updated link url https://........git]

git@github.com:Manananaam/Intellego.git
*/
