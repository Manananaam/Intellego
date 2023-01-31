import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import courseSlice from "./slices/courseSlices";

// From templateSlices
import { templateReducer } from "./slices/templateSlices";

//na:  From student report slice
import { studentReportReducer } from "./slices/studentReportSlice";

//na: From student enroll slice
import { studentEnrollReducer } from "./slices/studentEnrollSlice";
//authentication slice
import { authReducer } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    template: templateReducer,
    courses: courseSlice,
    auth: authReducer,
    studentReport: studentReportReducer,
    studentEnroll: studentEnrollReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export { example } from "./slices/templateSlices";
export { fetchStudentList } from "./slices/studentEnrollSlice";
export { fetchGradeForEachAssessment } from "./slices/studentReportSlice";
