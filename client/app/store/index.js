import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// From templateSlices
import { templateReducer } from "./slices/templateSlices";

//na:  From student report slice
import { studentReportReducer } from "./slices/studentReportSlice";

const store = configureStore({
  reducer: {
    template: templateReducer,
    studentReport: studentReportReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export { example } from "./slices/templateSlices";
