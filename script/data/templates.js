const userSeed = [
  {
    id: 1,
    firstName: "Maxiel",
    lastName: "Coder",
    email: "test@email.com",
    password: "123123",
  },
  {
    id: 2,
    firstName: "Kara",
    lastName: "Teacher",
    email: "kara@email.com",
    password: "123123",
  },
  {
    id: 3,
    firstName: "Sarah",
    lastName: "Mentor",
    email: "sarah@email.com",
    password: "123123",
  },
];
const assessmentSeed = [
  {
    id: 5,
    title: "Test Assessment",
    userId: 1,
  },
  {
    id: 8,
    title: "Quiz on Romeo and Juliet",
    userId: 2,
  },
  {
    id: 10,
    title: "Quiz on Hamlet",
    userId: 2,
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
  {
    id: 20,
    name: "Shakespeare II Class",
    subject: "ELA",
    gradeLevel: 8,
    userId: 2,
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
    questionText: "Who is your favorite character in Romeo and Juliet?",
    assessmentId: 8,
  },
  {
    id: 3,
    questionText: "Why do the Montagues and Capulets hate each other?",
    assessmentId: 8,
  },
  {
    id: 4,
    questionText:
      "What is a movie or book that reminds you of Romeo and Juliet? Why?",
    assessmentId: 8,
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
    id: 8,
    response: "This is a sample response.",
    questionId: 1,
    studentId: 100,
  },
  {
    id: 9,
    response: "Mercutio",
    questionId: 2,
    studentId: 100,
  },
  {
    id: 10,
    response:
      "My favorite character is Rosalind, because she was smart not to get together with Romeo.",
    questionId: 2,
    studentId: 101,
  },
  {
    id: 11,
    response: "Superman.",
    questionId: 2,
    studentId: 102,
  },
  {
    id: 12,
    response: "They are too different to get along",
    questionId: 3,
    studentId: 100,
  },
  {
    id: 13,
    response:
      "It goes back to some slight so insignificant that no one knows what it is or who started it.",
    questionId: 3,
    studentId: 101,
  },
  {
    id: 14,
    response: "idk",
    questionId: 3,
    studentId: 102,
  },
  {
    id: 15,
    response: "Any movie where they are in love",
    questionId: 4,
    studentId: 100,
  },
  {
    id: 16,
    response: "West Side Story.",
    questionId: 4,
    studentId: 101,
  },
  {
    id: 17,
    response: "Captain Underpants",
    questionId: 4,
    studentId: 102,
  },
];

const courseAssessmentsSeed = [
  { courseId: 14, assessmentId: 5 },
  { courseId: 14, assessmentId: 8 },
  { courseId: 20, assessmentId: 8 },
  { courseId: 20, assessmentId: 10 },
];
const courseRosterSeed = [
  { studentId: 100, courseId: 14 },
  { studentId: 100, courseId: 20 },
  { studentId: 101, courseId: 20 },
  { studentId: 102, courseId: 20 },
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
