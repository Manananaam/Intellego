import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// From templateSlices
import { templateReducer } from "./slices/templateSlices";
import allAssessmentsReducer from "./slices/assessmentsTableSlice"

const store = configureStore({
  reducer: {
    template: templateReducer,
    assessments: allAssessmentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export { example } from "./slices/templateSlices";
