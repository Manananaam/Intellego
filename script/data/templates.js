const userSeed = [
  {
    id: 101,
    firstName: "Maxiel",
    lastName: "Coder",
    email: "test@email.com",
    password: "123123",
  },
  {
    id: 102,
    firstName: "Kara",
    lastName: "Teacher",
    email: "kara@email.com",
    password: "123123",
  },
  {
    id: 103,
    firstName: "Sarah",
    lastName: "Mentor",
    email: "sarah@email.com",
    password: "123123",
  },
];
const assessmentSeed = [
  {
    id: 105,
    title: "Test Assessment",
    userId: 101,
  },
  {
    id: 108,
    title: "Quiz on Romeo and Juliet",
    userId: 102,
  },
  {
    id: 110,
    title: "Quiz on Hamlet",
    userId: 102,
  },
];
const courseSeed = [
  {
    id: 114,
    name: "Test Course",
    subject: "ELA",
    gradeLevel: 3,
    userId: 101,
  },
  {
    id: 20,
    name: "Shakespeare II Class",
    subject: "ELA",
    gradeLevel: 8,
    userId: 102,
  },
];
const questionSeed = [
  {
    id: 101,
    questionText: "This is a sample question",
    assessmentId: 105,
  },
  {
    id: 102,
    questionText: "Who is your favorite character in Romeo and Juliet?",
    assessmentId: 108,
  },
  {
    id: 103,
    questionText: "Why do the Montagues and Capulets hate each other?",
    assessmentId: 108,
  },
  {
    id: 104,
    questionText:
      "What is a movie or book that reminds you of Romeo and Juliet? Why?",
    assessmentId: 108,
  },
];
const studentSeed = [
  {
    id: 100,
    firstName: "Miso",
    lastName: "Cat",
  },
  {
    id: 101,
    firstName: "Varla",
    lastName: "Cat",
  },
  {
    id: 102,
    firstName: "Gomez",
    lastName: "Pup",
  },
  {
    id: 103,
    firstName: "Ralph",
    lastName: "Pup",
  },
];
const submissionSeed = [
  {
    id: 108,
    response: "This is a sample response.",
    questionId: 101,
    studentId: 100,
  },
  {
    id: 109,
    response: "Mercutio",
    questionId: 102,
    studentId: 100,
  },
  {
    id: 110,
    response:
      "My favorite character is Rosalind, because she was smart not to get together with Romeo.",
    questionId: 102,
    studentId: 101,
  },
  {
    id: 111,
    response: "Superman.",
    questionId: 102,
    studentId: 102,
  },
  {
    id: 112,
    response: "They are too different to get along",
    questionId: 103,
    studentId: 100,
  },
  {
    id: 113,
    response:
      "It goes back to some slight so insignificant that no one knows what it is or who started it.",
    questionId: 103,
    studentId: 101,
  },
  {
    id: 114,
    response: "idk",
    questionId: 103,
    studentId: 102,
  },
  {
    id: 115,
    response: "Any movie where they are in love",
    questionId: 104,
    studentId: 100,
  },
  {
    id: 116,
    response: "West Side Story.",
    questionId: 104,
    studentId: 101,
  },
  {
    id: 117,
    response: "Captain Underpants",
    questionId: 104,
    studentId: 102,
  },
];

const courseAssessmentsSeed = [
  { courseId: 114, assessmentId: 105 },
  { courseId: 114, assessmentId: 108 },
  { courseId: 120, assessmentId: 108 },
  { courseId: 120, assessmentId: 110 },
];
const courseRosterSeed = [
  { studentId: 100, courseId: 114 },
  { studentId: 100, courseId: 120 },
  { studentId: 101, courseId: 120 },
  { studentId: 102, courseId: 120 },
];

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
