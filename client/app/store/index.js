import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import courseSlice from "./slices/courseSlices";

// From templateSlices
import { templateReducer } from "./slices/templateSlices";

//na:  From student report slice
import { studentReportReducer } from "./slices/studentReportSlice";

//na: From student enroll slice
import { studentEnrollReducer } from "./slices/studentEnrollSlice";

//na: From student view slice
import { studentViewReducer } from "./slices/studentViewSlice";
import { courseReportReducer } from "./slices/courseReportSlice";
//authentication slice
import { authReducer } from "./slices/authSlice";
import allAssessmentsReducer from "./slices/assessmentsTableSlice";
import assessmentReducer from "./slices/singleAssessmentSlice";
import questionReducer from "./slices/questionSlice";

const store = configureStore({
  reducer: {
    template: templateReducer,
    report: courseReportReducer,
    courses: courseSlice,
    auth: authReducer,
    assessments: allAssessmentsReducer,
    assessment: assessmentReducer,
    question: questionReducer,
    studentReport: studentReportReducer,
    studentEnroll: studentEnrollReducer,
    studentView: studentViewReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export { example } from "./slices/templateSlices";
export { fetchStudentList, getCourses } from "./slices/studentEnrollSlice";
export { fetchGradeForEachAssessment } from "./slices/studentReportSlice";
export {
  fetchCourseAssessments,
  fetchCourseStudents,
} from "./slices/courseSlices";
export { fetchAssessment } from "./slices/singleAssessmentSlice";
