import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// From templateSlices
import { templateReducer } from "./slices/templateSlices";
import { courseReportReducer } from "./slices/CourseReportSlice"

const store = configureStore({
  reducer: {
    template: templateReducer,
    report: courseReportReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export { example } from "./slices/templateSlices";
