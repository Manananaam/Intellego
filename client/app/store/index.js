import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import courseSlice from "./slices/courseSlices";

// From templateSlices
import { templateReducer } from "./slices/templateSlices";
import { courseReportReducer } from "./slices/CourseReportSlice"
//authentication slice
import { authReducer } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    template: templateReducer,
    report: courseReportReducer,
    courses: courseSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export { example } from "./slices/templateSlices";
